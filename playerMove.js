let euler = new THREE.Euler(0, 0, 0, 'YXZ');
let distancesArray = [];
let collision = { forward: false, backward: false, left: false, rigth: false };
let pressedKeys = [];

const onKeyDown = () => {
   let found = false;
   for (let i = 0; i < pressedKeys.length; i++) {
      if (pressedKeys[i].keyCode === event.keyCode) {
         found = true;
         break;
      }
   }

   if (!found)
      pressedKeys.push(event);
}

const onKeyUp = () => {
   for (let i = 0; i < pressedKeys.length; i++) {
      if (pressedKeys[i].keyCode === event.keyCode) {
         pressedKeys.splice(i, 1);
      }
   }

   if (collision.backward) {
      camera.translateZ(-0.2);
      collision.backward = false;
   }
   if (collision.forward) {
      camera.translateZ(0.2);
      collision.forward = false;
   }
   if (collision.rigth) {
      camera.translateX(-0.2);
      collision.rigth = false;
   }
   if (collision.left) {
      camera.translateX(0.2);
      collision.left = false;
   }
}

const collisionDetection = () => {
   distancesArray = [];
   for (let i = 0; i < wallArary.length; i++) {
      distancesArray.push({ posZ: Math.abs(wallArary[i].position.z - camera.position.z), posX: Math.abs(wallArary[i].position.x - camera.position.x), });

   }
}

const moveAliensOnPlayer = () => {
   for (let i = 0; i < alienArary.length; i++) {
      let newPositionX1 = 0, newPositionX2 = 0, newPositionZ1 = 0, newPositionZ2 = 0;
      let alienCanMove = true;

      if (Math.sqrt(Math.pow(alienArary[i].position.z - camera.position.z, 2) + Math.pow(alienArary[i].position.x - camera.position.x, 2)) < 10) {
         if (alienArary[i].position.x < camera.position.x) {
            newPositionX1 = alienArary[i].position.x + 0.01;

            for (let j = 0; j < alienArary.length; j++) {
               if (Math.abs(alienArary[j].position.z - alienArary[i].position.z) < 0.5 && Math.abs(alienArary[j].position.x - newPositionX1) < 0.5 && j !== i)
                  alienCanMove = false;
            }
            if (alienCanMove) {
               for (let j = 0; j < wallArary.length; j++) {
                  if (Math.abs(wallArary[j].position.z - alienArary[i].position.z) < 1 && Math.abs(wallArary[j].position.x - newPositionX1) < 1)
                     alienCanMove = false;
               }
            }

            if (alienCanMove && Math.abs(camera.position.x - newPositionZ1) > 0.25) {
               alienArary[i].position.x = newPositionX1;
            }

            alienCanMove = true;
         }

         if (alienArary[i].position.x > camera.position.x) {
            newPositionX2 = alienArary[i].position.x - 0.01;

            for (let j = 0; j < alienArary.length; j++) {
               if (Math.abs(alienArary[j].position.z - alienArary[i].position.z) < 0.5 && Math.abs(alienArary[j].position.x - newPositionX2) < 0.5 && j !== i)
                  alienCanMove = false;
            }
            if (alienCanMove) {
               for (let j = 0; j < wallArary.length; j++) {
                  if (Math.abs(wallArary[j].position.z - alienArary[i].position.z) < 1 && Math.abs(wallArary[j].position.x - newPositionX2) < 1)
                     alienCanMove = false;
               }
            }
            if (alienCanMove && Math.abs(camera.position.x - newPositionX2) > 0.25)
               alienArary[i].position.x = newPositionX2;

            alienCanMove = true;
         }

         if (alienArary[i].position.z < camera.position.z) {
            newPositionZ1 = alienArary[i].position.z + 0.01;

            for (let j = 0; j < alienArary.length; j++) {
               if (Math.abs(alienArary[j].position.x - alienArary[i].position.x) < 0.5 && Math.abs(alienArary[j].position.z - newPositionZ1) < 0.5 && j !== i)
                  alienCanMove = false;
            }
            if (alienCanMove) {
               for (let j = 0; j < wallArary.length; j++) {
                  if (Math.abs(wallArary[j].position.x - alienArary[i].position.x) < 1 && Math.abs(wallArary[j].position.z - newPositionZ1) < 1)
                     alienCanMove = false;
               }
            }
            if (alienCanMove && Math.abs(camera.position.z - newPositionZ1) > 0.25)
               alienArary[i].position.z = newPositionZ1;

            alienCanMove = true;
         }

         if (alienArary[i].position.z > camera.position.z) {
            newPositionZ2 = alienArary[i].position.z - 0.01;

            for (let j = 0; j < alienArary.length; j++) {
               if (Math.abs(alienArary[j].position.x - alienArary[i].position.x) < 0.5 && Math.abs(alienArary[j].position.z - newPositionZ2) < 0.5 && j !== i)
                  alienCanMove = false;
            }
            if (alienCanMove) {
               for (let j = 0; j < wallArary.length; j++) {
                  if (Math.abs(wallArary[j].position.x - alienArary[i].position.x) < 1 && Math.abs(wallArary[j].position.z - newPositionZ2) < 1)
                     alienCanMove = false;
               }
            }
            if (alienCanMove && Math.abs(camera.position.z - newPositionZ2) > 0.25)
               alienArary[i].position.z = newPositionZ2;

            alienCanMove = true;
         }
      }

      alienArary[i].lookAt(camera.position.x, 0, camera.position.z);
   }
}

const moveCamera = () => {
   let canPlayerMove = false;
   for (let i = 0; i < pressedKeys.length; i++) {
      switch (pressedKeys[i].keyCode) {
         case 83: // backward
            collisionDetection();

            for (let k = 0; k < distancesArray.length; k++) {
               if (distancesArray[k].posX < 0.75 && distancesArray[k].posZ < 0.75) {
                  canPlayerMove = true;
                  collision.backward = true;
               }
            }

            if (!canPlayerMove) {
               camera.translateZ(0.05);
            }
            gun.position.set(
               camera.position.x - 1,
               camera.position.y - 0.5,
               camera.position.z - 1,
            )
            gun.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
            camera.position.y = playerStartPosition.y;
            break;
         case 87: // forward
            collisionDetection();

            for (let k = 0; k < distancesArray.length; k++) {
               if (distancesArray[k].posX < 0.75 && distancesArray[k].posZ < 0.75) {
                  canPlayerMove = true;
                  collision.forward = true;
               }
            }

            if (!canPlayerMove) {
               camera.translateZ(-0.05);
            }
            gun.position.set(
               camera.position.x,
               camera.position.y - 0.5,
               camera.position.z - 1,
            )
            gun.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
            camera.position.y = playerStartPosition.y;
            break;
         case 68: //right
            collisionDetection();

            for (let k = 0; k < distancesArray.length; k++) {
               if (distancesArray[k].posX < 0.75 && distancesArray[k].posZ < 0.75) {
                  canPlayerMove = true;
                  collision.rigth = true;
               }
            }

            if (!canPlayerMove) {
               camera.translateX(0.05);
            }
            gun.position.set(
               camera.position.x - 1,
               camera.position.y - 0.5,
               camera.position.z - 1,
            )
            gun.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
            camera.position.y = playerStartPosition.y;
            break;
         case 65: // left
            collisionDetection();

            for (let k = 0; k < distancesArray.length; k++) {
               if (distancesArray[k].posX < 0.75 && distancesArray[k].posZ < 0.75) {
                  canPlayerMove = true;
                  collision.left = true;
               }
            }

            if (!canPlayerMove) {
               camera.translateX(-0.05);
            }

            camera.position.y = playerStartPosition.y;

            gun.position.set(
               camera.position.x - 1,
               camera.position.y - 0.5,
               camera.position.z - 1,
            )
            gun.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
            break;
      }
   }
}

const mouseMove = () => {
   if (!collision.forward && !collision.backward && !collision.rigth && !collision.left) {
      let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      euler.setFromQuaternion(camera.quaternion);

      euler.y -= movementX * 0.002;
      euler.x -= movementY * 0.002;

      euler.x = Math.max(- PI_2, Math.min(PI_2, euler.x));

      camera.quaternion.setFromEuler(euler);

      gun.quaternion.setFromEuler(euler);
      gun.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
   }
}
