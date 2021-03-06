var express = require('express');
var router = express.Router();
var moment = require('moment');
const knex = require('../db/knex.js');
const Modules = require('../db/modules.js');

router.get('/', (req, res, next)=> {
    res.render('reports', {title: 'Reports'});
});

router.get('/c01_breast', (req, res, next) => {
  Modules.c01_breast().then(function (data) {

    var ninetyPlus = [];
    var sixtyToNinety = [];
    var thirtyToSixty = [];
    var thirtyLess = [];
    var overThirtyLess = [];
    var overThirtyToSixty = [];
    var overSixtyToNinety = [];
    var overNinety = [];
    var tableArray = [];
    var arrayOfDueDates = [];

    for (var i = 0; i < data.length; i++) {
      var patient = data[i];
      var patientE = patient.enrollment;
      var patientB = patient.c01_breast;
      if (patientE < moment().subtract(1, 'y')) {
      patientE = moment(patientE).set('year', 2015);
      }
      if (moment(patientB).isBetween(moment().subtract(1, 'y'), moment()))   { ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(275, 'd')) && patientB === null) {
        ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(305, 'd')) && patientB === null) {
        sixtyToNinety.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(335, 'd')) && patientB === null) {
        thirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(1, 'y')) && patientB === null) {
        thirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(395, 'd')) && patientB === null) {
        overThirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(425, 'd')) && patientB === null) {
        overThirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(455, 'd')) && patientB === null) {
        overSixtyToNinety.push(patient);
      } else if (moment(patientE).isSameOrBefore(moment().subtract(455, 'd')) && patientB === null) {
        overNinety.push(patient);
      }  else if (moment(patientB).isBetween(moment(patientE).add(30, 'd'), moment())){
        thirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(60, 'd'), moment())){
        thirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(90, 'd'), moment())){
        sixtyToNinety.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE), moment())){
        ninetyPlus.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(30, 'd'), moment())){
        overThirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(60, 'd'), moment())){
        overThirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(90, 'd'), moment())){
        overSixtyToNinety.push(patient);
      } else if (moment(patientB).isSameOrBefore(moment(patientE).subtract(90, 'd'), moment())){
        overNinety.push(patient);
      } else {
        overNinety.push(patient);
      }
  }

    var graphArray = [
      {title: 'Breast Cancer Screening'},
      {label: 'More than 90 Days', count: ninetyPlus.length, id: 'c01'},
      {label: 'Between 90 and 60 Days', count: sixtyToNinety.length, id: 'c02'},
      {label: 'Between 60 and 30 Days', count: thirtyToSixty.length, id: 'c03'},
      {label: 'Less than 30 Days', count: thirtyLess.length, id: 'c04'},
      {label: 'Overdue less than 30 Days', count: overThirtyLess.length, id: 'c05'},
      {label: 'Overdue between 30 and 60 Days', count: overThirtyToSixty.length, id: 'c06'},
      {label: 'Overdue between 60 and 90 Days', count: overSixtyToNinety.length, id: 'c07'},
      {label: 'Overdue more than 90 Days', count: overNinety.length, id: 'c08'},
    ];

    var arrayOfDueDates = [ninetyPlus, sixtyToNinety, thirtyToSixty, thirtyLess, overThirtyLess, overThirtyToSixty, overSixtyToNinety, overNinety];

    for (var i = 1; i < graphArray.length; i++) {
      var key = graphArray[i].id;
      var object = {};
      object[key] = arrayOfDueDates[i-1];
      tableArray.push(object);
    };
    res.send({ graph: graphArray, table: tableArray});
  });
});

router.get('/c02_cancer', (req, res, next) => {
  Modules.c02_cancer().then(function (data) {
    var ninetyPlus = [];
    var sixtyToNinety = [];
    var thirtyToSixty = [];
    var thirtyLess = [];
    var overThirtyLess = [];
    var overThirtyToSixty = [];
    var overSixtyToNinety = [];
    var overNinety = [];
    var tableArray = [];
    var arrayOfDueDates = [];

    for (var i = 0; i < data.length; i++) {
      var patient = data[i];
      var patientE = patient.enrollment;
      var patientB = patient.c02_cancer;
      if (patientE < moment().subtract(1, 'y')) {
      patientE = moment(patientE).set('year', 2015);
      }
      if (moment(patientB).isBetween(moment().subtract(1, 'y'), moment()))   { ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(275, 'd')) && patientB === null) {
        ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(305, 'd')) && patientB === null) {
        sixtyToNinety.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(335, 'd')) && patientB === null) {
        thirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(1, 'y')) && patientB === null) {
        thirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(395, 'd')) && patientB === null) {
        overThirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(425, 'd')) && patientB === null) {
        overThirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(455, 'd')) && patientB === null) {
        overSixtyToNinety.push(patient);
      } else if (moment(patientE).isSameOrBefore(moment().subtract(455, 'd')) && patientB === null) {
        overNinety.push(patient);
      }  else if (moment(patientB).isBetween(moment(patientE).add(30, 'd'), moment())){
        thirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(60, 'd'), moment())){
        thirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(90, 'd'), moment())){
        sixtyToNinety.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE), moment())){
        ninetyPlus.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(30, 'd'), moment())){
        overThirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(60, 'd'), moment())){
        overThirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(90, 'd'), moment())){
        overSixtyToNinety.push(patient);
      } else if (moment(patientB).isSameOrBefore(moment(patientE).subtract(90, 'd'), moment())){
        overNinety.push(patient);
      } else {
        overNinety.push(patient);
      }
  }
    var graphArray = [
      {title: 'Colorectal Cancer Screening'},
      {label: 'More than 90 Days', count: ninetyPlus.length, id: 'c01'},
      {label: 'Between 90 and 60 Days', count: sixtyToNinety.length, id: 'c02'},
      {label: 'Between 60 and 30 Days', count: thirtyToSixty.length, id: 'c03'},
      {label: 'Less than 30 Days', count: thirtyLess.length, id: 'c04'},
      {label: 'Overdue less than 30 Days', count: overThirtyLess.length, id: 'c05'},
      {label: 'Overdue between 30 and 60 Days', count: overThirtyToSixty.length, id: 'c06'},
      {label: 'Overdue between 60 and 90 Days', count: overSixtyToNinety.length, id: 'c07'},
      {label: 'Overdue more than 90 Days', count: overNinety.length, id: 'c08'},
    ];

      var arrayOfDueDates = [ninetyPlus, sixtyToNinety, thirtyToSixty, thirtyLess, overThirtyLess, overThirtyToSixty, overSixtyToNinety, overNinety];

      for (var i = 1; i < graphArray.length; i++) {
        var key = graphArray[i].id;
        var object = {};
        object[key] = arrayOfDueDates[i-1];
        tableArray.push(object);
      };
    res.send({ graph: graphArray, table: tableArray});
  });
});

router.get('/c03_flu_vac', (req, res, next) => {
  Modules.c03_flu_vac().then(function (data) {
    var ninetyPlus = [];
    var sixtyToNinety = [];
    var thirtyToSixty = [];
    var thirtyLess = [];
    var overThirtyLess = [];
    var overThirtyToSixty = [];
    var overSixtyToNinety = [];
    var overNinety = [];
    var tableArray = [];
    var arrayOfDueDates = [];

    for (var i = 0; i < data.length; i++) {
      var patient = data[i];
      var patientE = patient.enrollment;
      var patientB = patient.c03_flu_vac;
      if (patientE < moment().subtract(1, 'y')) {
      patientE = moment(patientE).set('year', 2015);
      }
      if (moment(patientB).isBetween(moment().subtract(1, 'y'), moment()))   { ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(275, 'd')) && patientB === null) {
        ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(305, 'd')) && patientB === null) {
        sixtyToNinety.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(335, 'd')) && patientB === null) {
        thirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(1, 'y')) && patientB === null) {
        thirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(395, 'd')) && patientB === null) {
        overThirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(425, 'd')) && patientB === null) {
        overThirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(455, 'd')) && patientB === null) {
        overSixtyToNinety.push(patient);
      } else if (moment(patientE).isSameOrBefore(moment().subtract(455, 'd')) && patientB === null) {
        overNinety.push(patient);
      }  else if (moment(patientB).isBetween(moment(patientE).add(30, 'd'), moment())){
        thirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(60, 'd'), moment())){
        thirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(90, 'd'), moment())){
        sixtyToNinety.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE), moment())){
        ninetyPlus.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(30, 'd'), moment())){
        overThirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(60, 'd'), moment())){
        overThirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(90, 'd'), moment())){
        overSixtyToNinety.push(patient);
      } else if (moment(patientB).isSameOrBefore(moment(patientE).subtract(90, 'd'), moment())){
        overNinety.push(patient);
      } else {
        overNinety.push(patient);
      }
  }
    var graphArray = [
      {title: 'Flu Vaccines'},
      {label: 'More than 90 Days', count: ninetyPlus.length, id: 'c01'},
      {label: 'Between 90 and 60 Days', count: sixtyToNinety.length, id: 'c02'},
      {label: 'Between 60 and 30 Days', count: thirtyToSixty.length, id: 'c03'},
      {label: 'Less than 30 Days', count: thirtyLess.length, id: 'c04'},
      {label: 'Overdue less than 30 Days', count: overThirtyLess.length, id: 'c05'},
      {label: 'Overdue between 30 and 60 Days', count: overThirtyToSixty.length, id: 'c06'},
      {label: 'Overdue between 60 and 90 Days', count: overSixtyToNinety.length, id: 'c07'},
      {label: 'Overdue more than 90 Days', count: overNinety.length, id: 'c08'},
    ];

      var arrayOfDueDates = [ninetyPlus, sixtyToNinety, thirtyToSixty, thirtyLess, overThirtyLess, overThirtyToSixty, overSixtyToNinety, overNinety];

      for (var i = 1; i < graphArray.length; i++) {
        var key = graphArray[i].id;
        var object = {};
        object[key] = arrayOfDueDates[i-1];
        tableArray.push(object);
      };
    res.send({ graph: graphArray, table: tableArray});
  });
});

router.get('/c12_osteoporosis', (req, res, next) => {
  Modules.c12_osteoporosis().then(function (data) {

    var ninetyPlus = [];
    var sixtyToNinety = [];
    var thirtyToSixty = [];
    var thirtyLess = [];
    var overThirtyLess = [];
    var overThirtyToSixty = [];
    var overSixtyToNinety = [];
    var overNinety = [];
    var tableArray = [];
    var arrayOfDueDates = [];

    for (var i = 0; i < data.length; i++) {
      var patient = data[i];
      var patientE = patient.enrollment;
      var patientB = patient.c12_osteoporosis;
      if (patientE < moment().subtract(1, 'y')) {
      patientE = moment(patientE).set('year', 2015);
      }
      if (moment(patientB).isBetween(moment().subtract(1, 'y'), moment()))   { ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(275, 'd')) && patientB === null) {
        ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(305, 'd')) && patientB === null) {
        sixtyToNinety.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(335, 'd')) && patientB === null) {
        thirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(1, 'y')) && patientB === null) {
        thirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(395, 'd')) && patientB === null) {
        overThirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(425, 'd')) && patientB === null) {
        overThirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(455, 'd')) && patientB === null) {
        overSixtyToNinety.push(patient);
      } else if (moment(patientE).isSameOrBefore(moment().subtract(455, 'd')) && patientB === null) {
        overNinety.push(patient);
      }  else if (moment(patientB).isBetween(moment(patientE).add(30, 'd'), moment())){
        thirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(60, 'd'), moment())){
        thirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(90, 'd'), moment())){
        sixtyToNinety.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE), moment())){
        ninetyPlus.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(30, 'd'), moment())){
        overThirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(60, 'd'), moment())){
        overThirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(90, 'd'), moment())){
        overSixtyToNinety.push(patient);
      } else if (moment(patientB).isSameOrBefore(moment(patientE).subtract(90, 'd'), moment())){
        overNinety.push(patient);
      } else {
        overNinety.push(patient);
      }
  }
    var graphArray = [
      {title: 'Osteoperosis Screening'},
      {label: 'More than 90 Days', count: ninetyPlus.length, id: 'c01'},
      {label: 'Between 90 and 60 Days', count: sixtyToNinety.length, id: 'c02'},
      {label: 'Between 60 and 30 Days', count: thirtyToSixty.length, id: 'c03'},
      {label: 'Less than 30 Days', count: thirtyLess.length, id: 'c04'},
      {label: 'Overdue less than 30 Days', count: overThirtyLess.length, id: 'c05'},
      {label: 'Overdue between 30 and 60 Days', count: overThirtyToSixty.length, id: 'c06'},
      {label: 'Overdue between 60 and 90 Days', count: overSixtyToNinety.length, id: 'c07'},
      {label: 'Overdue more than 90 Days', count: overNinety.length, id: 'c08'},
    ];
    var arrayOfDueDates = [ninetyPlus, sixtyToNinety, thirtyToSixty, thirtyLess, overThirtyLess, overThirtyToSixty, overSixtyToNinety, overNinety];

    for (var i = 1; i < graphArray.length; i++) {
      var key = graphArray[i].id;
      var object = {};
      object[key] = arrayOfDueDates[i-1];
      tableArray.push(object);
    };
  res.send({ graph: graphArray, table: tableArray});
  });
});

router.get('/c13_betus_eyecare', (req, res, next) => {
  Modules.c13_betus_eyecare().then(function (data) {

    var ninetyPlus = [];
    var sixtyToNinety = [];
    var thirtyToSixty = [];
    var thirtyLess = [];
    var overThirtyLess = [];
    var overThirtyToSixty = [];
    var overSixtyToNinety = [];
    var overNinety = [];
    var tableArray = [];
    var arrayOfDueDates = [];

    for (var i = 0; i < data.length; i++) {
      var patient = data[i];
      var patientE = patient.enrollment;
      var patientB = patient.c13_betus_eyecare;
      if (patientE < moment().subtract(1, 'y')) {
      patientE = moment(patientE).set('year', 2015);
      }
      if (moment(patientB).isBetween(moment().subtract(1, 'y'), moment()))   { ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(275, 'd')) && patientB === null) {
        ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(305, 'd')) && patientB === null) {
        sixtyToNinety.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(335, 'd')) && patientB === null) {
        thirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(1, 'y')) && patientB === null) {
        thirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(395, 'd')) && patientB === null) {
        overThirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(425, 'd')) && patientB === null) {
        overThirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(455, 'd')) && patientB === null) {
        overSixtyToNinety.push(patient);
      } else if (moment(patientE).isSameOrBefore(moment().subtract(455, 'd')) && patientB === null) {
        overNinety.push(patient);
      }  else if (moment(patientB).isBetween(moment(patientE).add(30, 'd'), moment())){
        thirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(60, 'd'), moment())){
        thirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(90, 'd'), moment())){
        sixtyToNinety.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE), moment())){
        ninetyPlus.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(30, 'd'), moment())){
        overThirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(60, 'd'), moment())){
        overThirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(90, 'd'), moment())){
        overSixtyToNinety.push(patient);
      } else if (moment(patientB).isSameOrBefore(moment(patientE).subtract(90, 'd'), moment())){
        overNinety.push(patient);
      } else {
        overNinety.push(patient);
      }
  }
    var graphArray = [
      {title: 'Diabetic Eye Exams'},
      {label: 'More than 90 Days', count: ninetyPlus.length, id: 'c01'},
      {label: 'Between 90 and 60 Days', count: sixtyToNinety.length, id: 'c02'},
      {label: 'Between 60 and 30 Days', count: thirtyToSixty.length, id: 'c03'},
      {label: 'Less than 30 Days', count: thirtyLess.length, id: 'c04'},
      {label: 'Overdue less than 30 Days', count: overThirtyLess.length, id: 'c05'},
      {label: 'Overdue between 30 and 60 Days', count: overThirtyToSixty.length, id: 'c06'},
      {label: 'Overdue between 60 and 90 Days', count: overSixtyToNinety.length, id: 'c07'},
      {label: 'Overdue more than 90 Days', count: overNinety.length, id: 'c08'},
    ];
    var arrayOfDueDates = [ninetyPlus, sixtyToNinety, thirtyToSixty, thirtyLess, overThirtyLess, overThirtyToSixty, overSixtyToNinety, overNinety];

    for (var i = 1; i < graphArray.length; i++) {
      var key = graphArray[i].id;
      var object = {};
      object[key] = arrayOfDueDates[i-1];
      tableArray.push(object);
    };
  res.send({ graph: graphArray, table: tableArray});
  });
});

router.get('/c14_betus_kidneycare', (req, res, next) => {
  Modules.c14_betus_kidneycare().then(function (data) {

    var ninetyPlus = [];
    var sixtyToNinety = [];
    var thirtyToSixty = [];
    var thirtyLess = [];
    var overThirtyLess = [];
    var overThirtyToSixty = [];
    var overSixtyToNinety = [];
    var overNinety = [];
    var tableArray = [];
    var arrayOfDueDates = [];

    for (var i = 0; i < data.length; i++) {
      var patient = data[i];
      var patientE = patient.enrollment;
      var patientB = patient.c14_betus_kidneycare;
      if (patientE < moment().subtract(1, 'y')) {
      patientE = moment(patientE).set('year', 2015);
      }
      if (moment(patientB).isBetween(moment().subtract(1, 'y'), moment()))   { ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(275, 'd')) && patientB === null) {
        ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(305, 'd')) && patientB === null) {
        sixtyToNinety.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(335, 'd')) && patientB === null) {
        thirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(1, 'y')) && patientB === null) {
        thirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(395, 'd')) && patientB === null) {
        overThirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(425, 'd')) && patientB === null) {
        overThirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(455, 'd')) && patientB === null) {
        overSixtyToNinety.push(patient);
      } else if (moment(patientE).isSameOrBefore(moment().subtract(455, 'd')) && patientB === null) {
        overNinety.push(patient);
      }  else if (moment(patientB).isBetween(moment(patientE).add(30, 'd'), moment())){
        thirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(60, 'd'), moment())){
        thirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(90, 'd'), moment())){
        sixtyToNinety.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE), moment())){
        ninetyPlus.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(30, 'd'), moment())){
        overThirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(60, 'd'), moment())){
        overThirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(90, 'd'), moment())){
        overSixtyToNinety.push(patient);
      } else if (moment(patientB).isSameOrBefore(moment(patientE).subtract(90, 'd'), moment())){
        overNinety.push(patient);
      } else {
        overNinety.push(patient);
      }
  }
    var graphArray = [
      {title: 'Diabetic Kidney Exam'},
      {label: 'More than 90 Days', count: ninetyPlus.length, id: 'c01'},
      {label: 'Between 90 and 60 Days', count: sixtyToNinety.length, id: 'c02'},
      {label: 'Between 60 and 30 Days', count: thirtyToSixty.length, id: 'c03'},
      {label: 'Less than 30 Days', count: thirtyLess.length, id: 'c04'},
      {label: 'Overdue less than 30 Days', count: overThirtyLess.length, id: 'c05'},
      {label: 'Overdue between 30 and 60 Days', count: overThirtyToSixty.length, id: 'c06'},
      {label: 'Overdue between 60 and 90 Days', count: overSixtyToNinety.length, id: 'c07'},
      {label: 'Overdue more than 90 Days', count: overNinety.length, id: 'c08'},
    ];
    var arrayOfDueDates = [ninetyPlus, sixtyToNinety, thirtyToSixty, thirtyLess, overThirtyLess, overThirtyToSixty, overSixtyToNinety, overNinety];

    for (var i = 1; i < graphArray.length; i++) {
      var key = graphArray[i].id;
      var object = {};
      object[key] = arrayOfDueDates[i-1];
      tableArray.push(object);
    };
  res.send({ graph: graphArray, table: tableArray});
  });
});

module.exports = router;
