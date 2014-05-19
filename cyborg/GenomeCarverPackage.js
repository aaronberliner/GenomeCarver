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
	var script = '/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/carveNode.py';
    var content;
    adskrt.ajax({ 
        url: script, 
        async: false, 
        cache: true, 
        success: function (_content) { content = _content;}, 
        error: function() {console.error('Error loading the file : ' + path);}, 
        dataType: 'text'
    });
    node.setPythonCompute(content);
    return node;
};

console.log('Defining FeaturesFactory');
Autodesk.Cyborg.Applications.GenomeCarver.FeaturesFactory = function (node){
	var script = '/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/GetSequenceNode.py';
    var content;
    adskrt.ajax({ 
        url: script, 
        async: false, 
        cache: true, 
        success: function (_content) { content = _content;}, 
        error: function() {console.error('Error loading the file : ' + path);}, 
        dataType: 'text'
    });
    node.setPythonCompute(content);
    return node;
};

console.log('Defining carverFactory');
Autodesk.Cyborg.Applications.GenomeCarver.carveFactory = function (node){
	node.setNodeInfo('viewtype', 'process');
	var script = '/siteversion/cyborg/applications/cai_lab/GenomeCarver/cyborg/CreatePrimerNode.py';
    var content;
    adskrt.ajax({ 
        url: script, 
        async: false, 
        cache: true, 
        success: function (_content) { content = _content;}, 
        error: function() {console.error('Error loading the file : ' + path);}, 
        dataType: 'text'
    });

    node.setPythonCompute(content);
    return node;
};
