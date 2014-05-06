import psycopg2

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
	seq = cur.fetchone()[0]
	if feature[4] == "+":
		return seq[feature[2]-1:feature[3]]
	elif feature[4] == "-":
		return seq[feature[2]-1:feature[3]][::-1].translate(string.maketrans("AaTtCcGg","TtAaGgCc"))
	else:
		raise "neither + nor -"

def checkRestriction(feature,cursor):
	#feature is (id, chromosome_id, start, end, strand)
	#cursor.execute("SELECT id, chromosome_id, start, \"end\", strand FROM neochromosome_feature WHERE chromosome_id = %d and feature = 'gene' and strand = '%s' and (\"end\" between %d and %d or start between %d and %d)"%(feature[1],feature[4],feature[2],feature[3],feature[2],feature[3]))
	cursor.execute("SELECT id, chromosome_id, start, \"end\", strand FROM neochromosome_feature WHERE chromosome_id = %d and feature = 'gene' and  (\"end\" between %d and %d or start between %d and %d)"%(feature[1],feature[2],feature[3],feature[2],feature[3]))
	return cursor.fetchall()

def trimPromoter(feature,restrictions):
	start = feature[2]
	for r in restrictions:
		if start <= r[3]:
			start = r[3]+1
	if start > feature[2]:
		start = feature[2]

def trimTerminatior(feature,restrictions):
	end = feature[3]
	for r in restrictions:
		if end >= r[2]:
			end = r[2]-1
	if end < feature[1]:
		end = feature[1]

def checkPT(geneName:

connection = psycopg2.connect(database="neochromosome", user="cyborg", password = "adsk2cailab", host="127.0.0.1", port="5432")

cur = connection.cursor()

geneName = "YAL069W"
species = "SC"

cur.execute("SELECT id, name, char_length(chromosome) FROM neochromosome_chromosome WHERE species = '%s'"%(species));
chromosomeLengthList =  cur.fetchall()

cur.execute("SELECT id, feature_id, name, value FROM neochromosome_featureattribute WHERE name = 'ID' and value='%s'"%(geneName))
selectGeneAttr = cur.fetchone()
cur.execute("SELECT id, chromosome_id, start, \"end\", strand FROM neochromosome_feature WHERE id = %d"%(selectGeneAttr[1]))
selectGeneFeature = cur.fetchone()

print selectGeneFeature

chromosomeLength = getChromosomeLength(chromosomeLengthList,selectGeneFeature[1])
seq = getSequence(selectGeneFeature,cur)
print seq 

pt = getPromoter(selectGeneFeature,chromosomeLength)
print pt 

seq = getSequence(pt,cur)
print seq

restriction = checkRestriction(pt,cur)
print restriction
