import mock1 from "../plantImages/mock1.jpg"
import mock3 from "../plantImages/mock3.jpg";
import mock4 from "../plantImages/mock4.jpg";
import mock5 from "../plantImages/mock5.jpg";

const plantObj1 = {
    image: mock1,
    id: 1,
    name: 'Plantus Pilate',
    blurb: 'Raddest plant'
  };
  
  const plantObj2 = {
    image: mock3,
    id: 2,
    name: 'Legolas Greenleaf',
    blurb: 'Legendary elf moss fungus'
  }
  
  const plantObj3 = {
    id: 3,
    image: mock4,
    name: 'Treebeard',
    blurb: 'WIZARDS SHOULD KNOW BETTER'
  }
  
  const plantObj4 = {
    id: 4,
    image: mock5,
    name: 'Longbottom Leaf',
    blurb: 'Old Toby\'s dankest'
  }
  
  const mockPlants = [plantObj1, plantObj2, plantObj3, plantObj4,];

  export default mockPlants