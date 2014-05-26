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

Autodesk.Cyborg.Nodes.Services.setWorkspaceName(self.workspaceID, 'Genome Carver');
setWorkspaceTitle("Genome Carver");
Autodesk.Cyborg.Note.title="Getting_Started";
Autodesk.Cyborg.Note.body= 'Created in collaboration with Cai Lab at the University of Edinburgh, the Genome Carver application harvests and packages biological parts from model genomes based on various part Standards. GenomeCarver carves DNA sequences from genome feature files (GFF) based on user selection, ensures sequence compatibility with various Standards, and outputs optimized parts. \nTo get started, identify a species genome. Then, select a chromosome, feature, and target part of interest. Specify the carve Standard of your Feature selection, and see the resulting carved Part. Open the resulting Part report in a browser to see its visualization.';
setWorkspaceIcon('/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/res/autogene_workspace.png');

// NODES
// Define Nodes to be used here
defineNodeType('GenomeCarver', 'Genome', Autodesk.Cyborg.Applications.GenomeCarver.GenomeFactory);
defineNodeType('GenomeCarver', 'select', Autodesk.Cyborg.Applications.GenomeCarver.selectFactory)
defineNodeType('GenomeCarver', 'Feature', Autodesk.Cyborg.Applications.GenomeCarver.FeatureFactory);
defineNodeType('GenomeCarver', 'carve', Autodesk.Cyborg.Applications.GenomeCarver.carveFactory);
defineNodeType('GenomeCarver', 'Part', Autodesk.Cyborg.Applications.GenomeCarver.PartFactory);

// CASSETES
// Define Cassetes to be loaded 
var selectArgs = JSON.stringify([
        {'outputField': 'Species', 'inputField':'Species', 'nodeType':'GenomeCarver.select' },
        {'outputField': 'Selection', 'inputField':'Selection', 'nodeType':'GenomeCarver.Feature' }
]);
var carveArgs = JSON.stringify([
        {'outputField': 'Feature', 'inputField':'Feature', 'nodeType':'GenomeCarver.carve' },
        {'outputField': 'Report', 'inputField':'Report', 'nodeType':'GenomeCarver.Part' }
]);
var selectAction = {
    'name': 'Select Feature',
    'cmd': 'node.createandconnectnodes',
    'args': selectArgs
};
var carveAction = {
    'name': 'Carve',
    'cmd': 'node.createandconnectnodes',
    'args': carveArgs
};
var action
createCassette('Genome Carver', '/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/res/GenomeCarver.png');
addCassetteItem('Genome Carver', 'GenomeCarver.Genome', '/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/res/DNA sequence.png');
addCassetteItem('Genome Carver', selectAction, '/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/res/Feature.png');
// addCassetteItem('Genome Carver', 'GenomeCarver.Feature', 'print3d/res/print.png');
addCassetteItem('Genome Carver', carveAction, '/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/res/CutFeature.png');
// addCassetteItem('Genome Carver', 'GenomeCarver.Part', 'print3d/res/print.png');

// DEFINE INITIAL WORKSPACE
var makeNodesAndConnections = function () {
	console.log('Calling makeNodesAndConnections');
    var ngv = Autodesk.Cyborg.ViewManager.instance().getViewFromType('NodeGraphView');
    var nm = Autodesk.Cyborg.NodeManager.instance();
    
    console.log('creating nodes');
    var args = { nodeType: "Note"};
    Autodesk.ActionManager.instance().startStackedWithArgs('node.createnode', args);

    args = { nodeType: "GenomeCarver.Genome"};
    Autodesk.ActionManager.instance().startStackedWithArgs('node.createnode', args);

    args = { nodeType: "GenomeCarver.select"};
    Autodesk.ActionManager.instance().startStackedWithArgs('node.createnode', args);

    args = { nodeType: "GenomeCarver.Feature"};
    Autodesk.ActionManager.instance().startStackedWithArgs('node.createnode', args);

    args = { nodeType: "GenomeCarver.carve"};
    Autodesk.ActionManager.instance().startStackedWithArgs('node.createnode', args);

    args = { nodeType: "GenomeCarver.Part"};
    Autodesk.ActionManager.instance().startStackedWithArgs('node.createnode', args);

    console.log('creating connections');
    args = { fromNodeID: 'Genome',
             fromFieldName: 'Species',
             toNodeID: 'select',
             toFieldName: 'Species'};
    Autodesk.ActionManager.instance().startStackedWithArgs('node.createconnection', args);

    args = { fromNodeID: 'select',
             fromFieldName: 'Selection',
             toNodeID: 'Feature',
             toFieldName: 'Selection'};
    Autodesk.ActionManager.instance().startStackedWithArgs('node.createconnection', args);

    args = { fromNodeID: 'Feature',
             fromFieldName: 'Feature',
             toNodeID: 'carve',
             toFieldName: 'Feature'};
    Autodesk.ActionManager.instance().startStackedWithArgs('node.createconnection', args);

    args = { fromNodeID: 'carve',
             fromFieldName: 'Report',
             toNodeID: 'Part',
             toFieldName: 'Report'};
    Autodesk.ActionManager.instance().startStackedWithArgs('node.createconnection', args);

    console.log('getting views');
    var GenomeNode = ngv.getNodeView(nm.getNode('Genome'));
    var selectNode = ngv.getNodeView(nm.getNode('select'));
    var FeatureNode = ngv.getNodeView(nm.getNode('Feature'));
    var carveNode = ngv.getNodeView(nm.getNode('carve'));
    var PartNode = ngv.getNodeView(nm.getNode('Part'));

    console.log('setting view positions');
    GenomeNode.setPosition(400,200);
    selectNode.setPosition(550,200);
    FeatureNode.setPosition(700,200);
    carveNode.setPosition(850,200);
    PartNode.setPosition(1000,200);

    // Note Node Visuals
    var node = nm.getNode('Note');
    node.setFieldVal(Autodesk.Cyborg.Note.title,Autodesk.Cyborg.Note.body);
    Autodesk.Cyborg.ViewManager._instance.getViewFromType('NodeGraphView').getNodeView(node).fields[Autodesk.Cyborg.Note.title].setQuickPropertyFlag(true);
    var noteNode = ngv.getNodeView(nm.getNode('Note'));
    noteNode.setPosition(40,560);
};

onLoad(makeNodesAndConnections);