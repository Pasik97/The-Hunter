let levelStructure = [];
let playerStartPosition = { x: 0, y: 1, z: 0 };

const readLevelFile = (file) => {
   var rawFile = new XMLHttpRequest();
   rawFile.open("GET", file, false);
   rawFile.onreadystatechange = function () {
       if (rawFile.readyState === 4) {
           if (rawFile.status === 200 || rawFile.status == 0) {
               var allText = rawFile.responseText.split('\n');
               levelStructure = allText.map(item => item.split(''));
           }
       }
   }
   rawFile.send(null);
}

const findplayerStartPosition = () => {
   for (let i = 0; i < levelStructure.length; i++) {
       for (let j = 0; j < levelStructure[i].length; j++) {
           if (levelStructure[i][j] === 'c') {
               playerStartPosition.x = j;
               playerStartPosition.z = i;
           }
       }
   }
}
