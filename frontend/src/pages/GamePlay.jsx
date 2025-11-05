import React, { useEffect } from 'react';
import Phaser from 'phaser';

function GamePlay() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 400,
      height: 300,
      scene: {
        preload() {
          this.load.image('logo', 'https://phaser.io/images/img.png');
        },
        create() {
          this.add.image(200, 150, 'logo');
        }
      }
    };
    new Phaser.Game(config);
  }, []);

  return <div id="game-container"></div>;
}

export default GamePlay;
