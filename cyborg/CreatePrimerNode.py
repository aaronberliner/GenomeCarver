mport psycopg2
import string
import json

def carver2(self):
	para = json.loads(self.Input)
	self.Sequence = para["Sequence"]
	chromosome = para["Chromosome"]
	checkBoundry = para["CheckBoundry"]
	featureName = para["FeatureName"]
	if para["Species"] == "S.cerevisiae":
		species = "SC"
	elif para["Species"] == "A.thaliana":
		species = "AT"
	else:
		species = self.Species
	carvePara = para["CarvePara"]


	std = self.Standard
	stdDict = {'promoter5':'GGTC','promoter3':'CATC','orf5':'GATG','orf3':'GCTA','terminator5':'TAGC','terminator3':'GAGG'}
	cStr5 = stdDict[carvePara+'5']
	cStr3 = stdDict[carvePara+'3']
	srcStr5 = str(self.Sequence)
	srcStr3 = str(srcStr5)[::-1]
	srcStr3 = srcStr3.translate(string.maketrans("AaTtCcGg","TtAaGgCc"))
	primerLength = int(self.PrimerLength)
	if std == "GoldenGate":
		self.Primer5 = ("GGTCTCg"+cStr5+srcStr5)[0:primerLength]
		self.Primer3 = ("GGTCTCg"+cStr3+srcStr3)[0:primerLength]
	else:
		self.Primer5 = "not support yet"
	
	self.Report = "http://genomecarver.cailab.org/carve/?species=%s&chromosomeName=%s&geneName=%s&checkBoundry=%s&standard=%s&carvePara=%s"%(species,chromosome,featureName,checkBoundry,self.Standard,carvePara)

carver2(self)



