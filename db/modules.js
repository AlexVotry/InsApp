const knex = require('./knex');

var pgFormatDate = function(date)  {
  function zeroPad(d) {
    return ("0" + d).slice(-2)
  }

  var parsed = new Date(date)

  return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate())].join('');
};

module.exports = {
  users:  function users() {
   return knex('users');
   },

   patients: function patients() {
     return knex('patients');
   },

   measures: function measures() {
     return knex('measures');
   },

   initialHRA: function initialHRA() {
     return knex('patients').join('measures', 'measures.patient_id', 'patients.id').select('measures.initial_hra', 'patients.enrollment');
   },

   enrollment: function enrollment() {
     return knex('patients').select('disenrollment');
   },

  c01_breast: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.gender', 'Female');
  },
  c02_cancer: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereBetween('patients.age', [50, 75]);
  },
  c03_flu_vac: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select();
  },
  c12_osteoporosis: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.gender', 'Female').where('patients.fracture', true);
  },
  c13_betus_eyecare: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.diabetes', true);
  },
  c14_betus_kidneycare: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.diabetes', true);
  },

    users:  function users() {
     return knex('users');
   },

   patients: function patients() {
     return knex('patients');
   },

   measures: function measures() {
     return knex('measures');
   }

 }
