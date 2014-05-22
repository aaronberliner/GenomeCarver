import psycopg2
import string
import json
import Nodes

def getChromosomeLength(chromosomeList, chromosome_id):
	for c in chromosomeList:
		if c[0] == chromosome_id:
			return c


def getPromoter(feature, chromosomeLength):
		#feature is (id, chromosome_id, start, end, strand)
	start = 0
	end = 0
	if feature[4] == "-":
		start = feature[3]+1
		end = feature[3]+500
	elif feature[4] == "+":
		start = feature[2]-500
		end = feature[2]-1
	else:
		raise "neither + nor -"

	if start <1:
		start = 1
	elif start >= chromosomeLength:
		start = chromosomeLength-1
	if end <1:
		end =1
	elif end >= chromosomeLength:
		end = chromosomeLength-1

	return (feature[0], feature[1], start, end, feature[4])

def getTerminator(feature, chromosomeLength):
		#feature is (id, chromosome_id, start, end, strand)
	if feature[4] == "-":
		start = feature[2]-200
		end = feature[2]-1
	elif feature[4] == "+":
		start = feature[3]+1
		end = feature[3]+200
	else:
		raise "neither + nor -"

	if start <1:
		start = 1
	elif start >= chromosomeLength:
		start = chromosomeLength-1
	if end <1:
		end =1
	elif end >= chromosomeLength:
		end = chromosomeLength-1

	return (feature[0],feature[1], start, end, feature[4])

def getSequence(feature,cursor):
	cursor.execute("SELECT chromosome FROM neochromosome_chromosome WHERE id = %d"%(feature[1]))
	seq = cursor.fetchone()[0]
	if feature[4] == "+":
		return seq[feature[2]-1:feature[3]]
	elif feature[4] == "-":
		return seq[feature[2]-1:feature[3]][::-1].translate(string.maketrans("AaTtCcGg","TtAaGgCc"))
	else:
		raise "neither + nor -"

def checkRestriction(feature,cursor):
	#feature is (id, chromosome_id, start, end, strand)
	#cursor.execute("SELECT id, chromosome_id, start, \"end\", strand FROM neochromosome_feature WHERE chromosome_id = %d and feature = 'gene' and strand = '%s' and (\"end\" between %d and %d or start between %d and %d)"%(feature[1],feature[4],feature[2],feature[3],feature[2],feature[3]))
	cursor.execute("SELECT id, chromosome_id, start, \"end\", strand FROM neochromosome_feature WHERE chromosome_id = %d and feature = 'gene' and  ((\"end\" between %d and %d) or (start between %d and %d))"%(feature[1],feature[2],feature[3],feature[2],feature[3]))
	return cursor.fetchall()

def trimLeft(feature,restrictions):
	start = feature[2]
	for r in restrictions:
		if start <= r[3]:
			start = r[3]+1
	if start > feature[3]:
		start = feature[3]
	return (feature[0],feature[1],start,feature[3],feature[4])

def trimRight(feature,restrictions):
	end = feature[3]
	for r in restrictions:
		if end >= r[2]:
			end = r[2]-1
	if end < feature[2]:
		end = feature[2]
	return (feature[0],feature[1],feature[2],end,feature[4])

def getGeneIDs(species,cursor):
	cursor.execute("select id from neochromosome_feature where feature = 'gene' and chromosome_id in (select id from neochromosome_chromosome where species = '%s')"%(species))
	return [x[0] for x in cursor.fetchall()]

def checkPT(geneName,species,carve,checkBoundry, cursor):
	cursor.execute("SELECT id, name, char_length(chromosome) FROM neochromosome_chromosome WHERE species = '%s'"%(species));
	chromosomeLengthList =  cursor.fetchall()

	cursor.execute("SELECT id, feature_id, name, value FROM neochromosome_featureattribute WHERE name = 'ID' and value='%s'"%(geneName))
	selectGeneAttr = cursor.fetchone()
	cursor.execute("SELECT id, chromosome_id, start, \"end\", strand FROM neochromosome_feature WHERE id = %d"%(selectGeneAttr[1]))
	selectGeneFeature = cursor.fetchone()

#	print selectGeneFeature

	chromosomeLength = getChromosomeLength(chromosomeLengthList,selectGeneFeature[1])
	seq = getSequence(selectGeneFeature,cursor)
#	print seq 

	if carve == "promoter":
		pt = getPromoter(selectGeneFeature,chromosomeLength)
	elif carve == "terminator":
		pt = getTerminator(selectGeneFeature,chromosomeLength)
	else:
		pt = selectGeneFeature
		checkBoundry = "False"
#	print pt 

	if checkBoundry == "True":
		r = checkRestriction(pt,cursor)
		if (carve =="promoter" and pt[4]=="+") or (carve=="terminator" and pt[4]=='-'):
			pt = trimLeft(pt,r)
		else:
			pt = trimRight(pt,r)

#		print pt
	return pt

def getLength(feature):
	return feature[3]-feature[2]+1

def getInfo(feature,cursor):
	feature_id = feature[0]
	chromosome_id = feature[1]
	cursor.execute("SELECT name FROM neochromosome_chromosome where id=%d"%(chromosome_id))
	chromosomeName = cursor.fetchone()[0]
	cursor.execute("SELECT value FROM neochromosome_featureattribute where feature_id=%d and name='ID'"%(feature_id))
	featureName = cursor.fetchone()[0]
	return "%s, %s, %d-%d, %s"%(chromosomeName,featureName,feature[2],feature[3],feature[4])

def getSequence(feature,cursor):
	cursor.execute("SELECT chromosome FROM neochromosome_chromosome WHERE id = %d"%(feature[1]))
	seq = cursor.fetchone()[0]
	if feature[4] == "+":
		return str(seq[feature[2]-1:feature[3]])
	elif feature[4] == "-":
		return str(seq[feature[2]-1:feature[3]][::-1]).translate(string.maketrans("AaTtCcGg","TtAaGgCc"))
	else:
		raise "neither + nor -"

def carver2(self):
	connection = psycopg2.connect(database="neochromosome", user="cyborg", password = "adsk2cailab", host="git.cailab.org", port="5432")

	cursor = connection.cursor()

	featureName = self.FeatureName
	if self.Species == "S.cerevisiae":
		species = "SC"
	elif self.Species == "A.thaliana":
		species = "AT"
	else:
		species = self.Species

	carvePara = self.TargetPart
	checkBoundary = self.CheckBoundary
	pt = checkPT(featureName,species,carvePara,checkBoundary,cursor); 

	self.StartBasePair = pt[2]
	self.EndBasePair = pt[3]
	self.Selection = json.dumps({"Species":self.Species,"Chromosome":self.Chromosome,"FeatureName":self.FeatureName, "CheckBoundary": self.CheckBoundary,"CarvedFeature":pt,"CarvePara":self.TargetPart})

carver2(self)