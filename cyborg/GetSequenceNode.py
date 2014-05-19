import psycopg2
import string
import json

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
	
	para = json.loads(self.Input)
	self.CarvedFeature = para["CarvedFeature"]
	
	featureStr = self.CarvedFeature
	feature = featureStr.split(",")
	for i in range(0,4):
		feature[i] = int(feature[i])
	
	self.Sequence = getSequence(feature,cursor)
	para["Sequence"]=self.Sequence
	self.Output = json.dumps(para)

carver2(self)


