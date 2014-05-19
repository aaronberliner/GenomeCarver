// Genome Carver.js

// NOTE: sourceURL needs a line above it.  Don't know why...
//@ sourceURL=/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/GenomeCarver.js

// Copyright 2014 Autodesk, Inc.  All rights reserved. 
// This computer source code and related instructions and comments
// are the unpublished confidential and proprietary information of 
// Autodesk, Inc. and are protected under applicable copyright and 
// trade secret law.  They may not be disclosed to, copied or used 
// by any third party without the prior written consent of 
// Autodesk, Inc.

adskrt._req('/siteversion/core/scripts/brep/body.js');
adskrt._req('/siteversion/core/scripts/brep/proceduralfeature.js');
adskrt._req('/siteversion/core/scripts/brep/procedures.js');
adskrt._req('/siteversion/core/scripts/brep/procedures/text.js');
adskrt._req('/siteversion/core/scripts/scene/style.js');
adskrt._req('/siteversion/core/scripts/scene/protein.js');
adskrt._req('/siteversion/core/scripts/math/vector3.js');
adskrt._req('/siteversion/core/scripts/math/matrix4.js');
adskrt._req('/siteversion/core/scripts/math/globals.js');
adskrt._req('/siteversion/core/scripts/libs/asm/api.js');
adskrt._req('/siteversion/core/scripts/math/point3.js');
adskrt._req('/siteversion/cyborg/scripts/transposable/shuttle.js');
adskrt._req('/siteversion/cyborg/scripts/app/nodes/asmutilities.js');
adskrt._req('/siteversion/cyborg/scripts/app/nodes/utilities.js');
adskrt._req('/siteversion/cyborg/scripts/core/math.js');
adskrt._req('/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/GenomeCarverPackage.js');

// NODES
// Define Nodes to be used here
defineNodeType('GenomeCarver', 'Genome', Autodesk.Cyborg.Applications.GenomeCarver.GenomeFactory);
defineNodeType('GenomeCarver', 'select', Autodesk.Cyborg.Applications.GenomeCarver.selectFactory)
defineNodeType('GenomeCarver', 'Features', Autodesk.Cyborg.Applications.GenomeCarver.FeaturesFactory);
defineNodeType('GenomeCarver', 'carve', Autodesk.Cyborg.Applications.GenomeCarver.carveFactory);

// CASSETES
// Define Cassetes to be loaded 
var action
createCassette('Genome Carver', 'print3d/res/print.png');
addCassetteItem('Genome Carver', 'GenomeCarver.Genome', 'print3d/res/print.png');
addCassetteItem('Genome Carver', 'GenomeCarver.select', 'print3d/res/print.png');
addCassetteItem('Genome Carver', 'GenomeCarver.Features', 'print3d/res/print.png');
addCassetteItem('Genome Carver', 'GenomeCarver.carve', 'print3d/res/print.png');