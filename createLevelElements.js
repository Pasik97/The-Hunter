let levelElements = [];
let wallArary = [];
let alienArary = [];
let gun;

const createLevel = () => {
   levelElements = levelStructure.map((row, rowIndex) => row.map((item, itemIndex) => {
      let result = [];
      if (item === 'x' || item === 'c' || item === 'p') {
         const mtlLoader = new THREE.MTLLoader();
         if (item === 'p') {
            mtlLoader.load('textures/Alien/Alien.mtl', (mtlParseResult) => {
               const objLoader = new THREE.OBJLoader();
               objLoader.setMaterials(mtlParseResult);
               objLoader.load('textures/Alien/Alien.obj', (root) => {
                  root.position.x = itemIndex;
                  root.position.z = rowIndex;
                  root.scale.set(0.125, 0.125, 0.125);
                  root.isAlien = true;
                  root.health = 5;
                  result.push(root);
                  alienArary.push(root)
                  scene.add(root);
               });
            });
         }
         if (item === 'c') {
            mtlLoader.load('textures/Gun/gun.mtl', (mtlParseResult) => {
               const objLoader = new THREE.OBJLoader();
               objLoader.setMaterials(mtlParseResult);
               objLoader.load('textures/Gun/gun.obj', (root) => {
                  root.scale.set(0.025, 0.025, 0.025);
                  camera.add(root);
                  root.position.z = -0.18;
                  root.position.y = -0.16;
                  root.position.x = 0.09;
                  root.rotation.y = 3.14;
                  gun = root;
               });
            });
         }

         const planeGeometry = new THREE.PlaneGeometry(1, 1, 1);
         const floorTexture = new THREE.TextureLoader().load('textures/floor.jpg');
         const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
         let floor = new THREE.Mesh(planeGeometry, floorMaterial);
         floor.rotation.x = PI_2;
         floor.position.x = itemIndex;
         floor.position.z = rowIndex;
         result.push(floor);

         if (itemIndex % 3 === 0 && rowIndex % 2 === 0) {
            const lampTexture = new THREE.TextureLoader().load('textures/ceilingLamp.jpg');
            const lampMaterial = new THREE.MeshBasicMaterial({ map: lampTexture, side: THREE.DoubleSide });
            let lamp = new THREE.Mesh(planeGeometry, lampMaterial);
            lamp.rotation.x = PI_2;
            lamp.position.y = 4;
            lamp.position.x = itemIndex;
            lamp.position.z = rowIndex;
            let light = new THREE.PointLight(0xff0000, 1, 100);
            light.position.set(itemIndex, 5, rowIndex);
            result.push(lamp);
            result.push(light);
         } else {
            const ceilingTexture = new THREE.TextureLoader().load('textures/ceiling.jpg');
            const ceilingMaterial = new THREE.MeshBasicMaterial({ map: ceilingTexture, side: THREE.DoubleSide });
            let ceiling = new THREE.Mesh(planeGeometry, ceilingMaterial);
            ceiling.rotation.x = PI_2;
            ceiling.position.y = 4;
            ceiling.position.x = itemIndex;
            ceiling.position.z = rowIndex;
            result.push(ceiling);
         }
      }

      if (item === '|') {
         for (let i = 0; i < 5; i++) {
            const wallTexture = new THREE.TextureLoader().load('textures/wall.jpg');
            const planeGeometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide });
            let wall = new THREE.Mesh(planeGeometry, material);
            wall.position.x = itemIndex;
            wall.position.z = rowIndex;
            wall.position.y = i;
            wall.isWall = true;
            result.push(wall);
            if(i===0)
               wallArary.push(wall);
         }
      }
      return result;
   }));
}
