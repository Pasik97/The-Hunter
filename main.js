let scene, camera, renderer;
let isGameActive = false;
let PI_2 = Math.PI / 2;

const init = () => {
    let minLevel = 1;
    let maxLevel = 3;
    let levelNumber = Math.floor(Math.random() * (maxLevel - minLevel)) + minLevel;
    readLevelFile(`./Level${levelNumber}.txt`);
    createLevel(); //creating levelElements
    console.log(levelElements)
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    findplayerStartPosition();
    camera.position.x = playerStartPosition.x;
    camera.position.z = playerStartPosition.z;
    camera.position.y = playerStartPosition.y;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight - 4);

    document.body.appendChild(renderer.domElement);
    createLevel();
    for (let i = 0; i < levelElements.length; i++) {
        for (let j = 0; j < levelElements[i].length; j++) {
            for (let k = 0; k < levelElements[i][j].length; k++) {
                scene.add(levelElements[i][j][k]);
            }
        }
    }

    scene.add(camera);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight - 4);
}

const startGame = () => {
    if (!isGameActive) {
        document.body.addEventListener('keydown', onKeyDown, false);
        document.body.addEventListener('keyup', onKeyUp, false);
        document.body.requestPointerLock();
        document.addEventListener('mousemove', mouseMove, false);
        document.body.requestFullscreen();
    }
};

const pauseGame = () => {
    if (!isGameActive) {
        isGameActive = true;
    } else {
        isGameActive = false;
        document.removeEventListener('mousemove', mouseMove, false);
        document.body.removeEventListener('keydown', onKeyDown, false);
        document.body.removeEventListener('keyup', onKeyUp, false);
    }
};

document.body.addEventListener('click', startGame, false);
window.addEventListener('fullscreenchange', pauseGame, false);
window.addEventListener('resize', onWindowResize, false);

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (isGameActive) {
        //moveAliensOnPlayer();
        moveCamera();
    }
}

init();
animate();
