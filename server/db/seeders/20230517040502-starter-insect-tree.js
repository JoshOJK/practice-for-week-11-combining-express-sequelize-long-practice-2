'use strict';
const {Insect, Tree} = require('../models');
const {Op} = require('sequelize')
const insect = require('../models/insect');


const seedData = [
  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [
      { tree: "Stagg" },
    ],
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for(let i = 0; i< seedData.length; i++) {
      const obj = seedData[i];
      const insect = await Insect.findOne({where: obj.insect})
      const trees = await Tree.findAll({where: {[Op.or]: obj.trees}})
      await insect.addTrees(trees);
    }
  },

  async down (queryInterface, Sequelize) {
    for(let i = 0; i< seedData.length; i++) {
      const obj = seedData[i];
      const insect = await Insect.findOne({where: obj.insect})
      const trees = await Tree.findAll({where: {[Op.or]: obj.trees}})
      await insect.removeTrees(trees);
    }
  }
};
