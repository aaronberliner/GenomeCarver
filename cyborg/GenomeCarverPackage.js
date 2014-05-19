// Genome Carver Package.js

// NOTE: sourceURL needs a line above it.  Don't know why...
//@ sourceURL=/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/GenomeCarverPackage.js

// Copyright 2014 Autodesk, Inc.  All rights reserved. 
// This computer source code and related instructions and comments
// are the unpublished confidential and proprietary information of 
// Autodesk, Inc. and are protected under applicable copyright and 
// trade secret law.  They may not be disclosed to, copied or used 
// by any third party without the prior written consent of 
// Autodesk, Inc.

Autodesk.Cyborg.Applications = Autodesk.Cyborg.Applications || {};
Autodesk.Cyborg.Applications.GenomeCarver = Autodesk.Cyborg.Applications.GenomeCarver || {};


console.log('Defining GenomeFactory');
Autodesk.Cyborg.Applications.GenomeCarver.GenomeFactory = function (node){
    node.addField('Species', 'String', null);
}

console.log('Defining selectFactory');
Autodesk.Cyborg.Applications.GenomeCarver.selectFactory = function (node){
    node.addField('Species', 'String', null);
    node.addField('Chromosome', 'String', null);
    node.addField('FeatureName', 'String', null);
    node.addField('CarveWhat', 'String', null);
    node.addField('CheckBoundry', 'String', null);
    node.addField('StartBasePair', 'String', null);
    node.addField('EndBasePair', 'String', null);
    node.addField('Selection', 'String', null);
	var script = '/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/carveNode.py';
    var content;
    adskrt.ajax({ 
        url: script, 
        async: false, 
        cache: true, 
        success: function (_content) { content = _content;}, 
        error: function() {console.error('Error loading the file : ' + script);}, 
        dataType: 'text'
    });
    node.setPythonCompute(content);
    return node;
};

console.log('Defining FeatureFactory');
Autodesk.Cyborg.Applications.GenomeCarver.FeatureFactory = function (node){
    node.addField('Selection', 'String', null);
    node.addField('Sequence', 'String', null);
    node.addField('Feature', 'String', null);
	var script = '/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/GetSequenceNode.py';
    var content;
    adskrt.ajax({ 
        url: script, 
        async: false, 
        cache: true, 
        success: function (_content) { content = _content;}, 
        error: function() {console.error('Error loading the file : ' + script);}, 
        dataType: 'text'
    });
    node.setPythonCompute(content);
    return node;
};

console.log('Defining carveFactory');
Autodesk.Cyborg.Applications.GenomeCarver.carveFactory = function (node){
    node.addField('Feature', 'String', null);
    node.addField('Standard', 'String', null);
    node.addField('PrimerLength', 'String', null);
    node.addField('Primer5', 'String', null);
    node.addField('Primer3', 'String', null);
    node.addField('Report', 'String', null);
	node.setNodeInfo('viewtype', 'process');
	var script = '/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/CreatePrimerNode.py';
    var content;
    adskrt.ajax({ 
        url: script, 
        async: false, 
        cache: true, 
        success: function (_content) { content = _content;}, 
        error: function() {console.error('Error loading the file : ' + script);}, 
        dataType: 'text'
    });

    node.setPythonCompute(content);
    return node;
};

console.log('Defining PartFactory');
Autodesk.Cyborg.Applications.GenomeCarver.PartFactory = function (node){
    node.addField('Report', 'String', null);
}
