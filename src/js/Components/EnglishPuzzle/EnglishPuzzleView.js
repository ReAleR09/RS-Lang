/* eslint-disable class-methods-use-this */
import engPuzConst from './EnglishPuzzleConstants';

export default class EnglisPuzzleView {
  attach(element) {
    this.element = element;
    // this.initDifficultySwitcher();
    // this.initWordSoundButtonClick();
    // this.initBeginButton();
    // this.initFinishButton();
  }

  getGameLayout() {
    const html = `
    <div>
    <div class="flex-between">
    <div class="engPuz__settings flex-center">
      <div class="input-field">
          <select class="engPuz__difficulty">
            <option value="" disabled selected>Choose difficulty</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 3</option>
            <option value="5">Option 3</option>
            <option value="6">Option 3</option>
          </select>
          <label>difficulty</label>
      </div>
      <div class="input-field">
        <select class="engPuz__page">
          <option value="" disabled selected>Choose page</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <label>Page</label>
    </div>
    </div>
      
    <div class="engPuz__tooltips flex-between">
      <a class="engPuz__tooltips-autoPlay btn-floating waves-effect"> <i class="medium material-icons">volume_up</i></a>
      <a class="engPuz__tooltips-translation btn-floating circle waves-effect"> <i class="medium material-icons">translate</i></a>
      <a class="engPuz__tooltips-audioSwitcher btn-floating circle waves-effect"> <i class="medium material-icons">music_video</i></a>
      <a class="engPuz__tooltips-picture btn-floating circle waves-effect"> <i class="medium material-icons">photo</i></a>
    </div>
    </div>
    <div class="flex-center">
    <a class="engPuz__audio #ffb74d orange lighten-2 center btn waves-effect waves-purple "><i class="material-icons">volume_up</i></a>
    </div>
    <div class="flex-center">
    <blockquote class="engPuz__translation center flex-center">Sentes translation</blockquote>
    </div>
    <div id="engPuz__drop-section" class="engPuz__drop-section card-panel"></div>
    <div id="engPuz__drag-section" class="engPuz__drag-section card-panel flex-between"></div>
      <div class="engPuz__bottom-btn flex-center">
      <a class="engPuz__bottom-idk #fce4ec pink lighten-3 btn waves-effect"><i class="material-icons">cancel</i>don't know</a>
      <a class="engPuz__bottom-check #81c784 green lighten-1 btn waves-effect"><i class="material-icons">done_all</i>Check</a>
      </div>
    </div>
    `;
    return html;
  }

  getPuzzleElements(imgSrc, wordsList) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.src = imgSrc;

      const dropZoneWidth = parseInt(document.querySelector(`.${engPuzConst.content.DROPSECTION}`).offsetWidth, 10) - 30;

      img.onload = () => {
        // const extraWidthValue = 3;
        const imgWidth = img.width > dropZoneWidth ? dropZoneWidth : img.width;
        const imgHeight = img.height;
        const groupsWords = wordsList.map((word) => word.split(' '));
        const groupsRow = groupsWords.length;
        const EXTRA_WIDTH_VALUE = 3;
        const result = [];

        let startYPointCropImage = 0;

        groupsWords.forEach((words, i) => {
          const row = document.createElement('div');
          const wordCount = words.length;
          const letterCounts = words.reduce((acc, val) => acc + val.replace(/<[^>]*>/g, '').length, 0);
          const reduceLength = letterCounts * EXTRA_WIDTH_VALUE;
          const extraWidth = Math.round(reduceLength / wordCount);
          const onePart = Math.round((imgWidth - reduceLength) / letterCounts);
          const canvasHeight = Math.round(imgHeight / groupsRow) - 20;

          let widthCount = 0;

          row.classList.add('group-words');
          row.classList.add(`row-${i + 1}`);

          words.forEach((w, j) => {
            const word = w.replace(/<[^>]*>/g, '');
            const canvas = document.createElement('canvas');

            canvas.classList.add('canvas-item');
            canvas.classList.add(`canvas-row-${i + 1}`);
            canvas.classList.add(`canvas-item-${j + 1}`);
            canvas.setAttribute('data-item', `${i + 1}-${j + 1}`);
            canvas.setAttribute('data-word', word);

            const ctx = canvas.getContext('2d');
            let canvasWidth = (word.length * onePart) + extraWidth;

            if (j === wordCount - 1) {
              canvasWidth = imgWidth - widthCount;
              widthCount += canvasWidth;
            } else {
              widthCount += canvasWidth;
            }

            const x1 = 0;
            const y1 = Math.round(canvasHeight / 3);
            const y2 = Math.round((canvasHeight / 3) * 2);
            const centerY = canvasHeight / 2;
            const radius = Math.round((canvasHeight / 3) / 2);
            const startXPointCropImage = widthCount - canvasWidth;

            const windoWidth = window.innerWidth;
            let fontSize;

            switch (true) {
              case windoWidth < 370:
                fontSize = Math.round(canvasHeight / 9);
                break;
              case windoWidth < 450:
                fontSize = Math.round(canvasHeight / 8);
                break;
              case windoWidth < 650:
                fontSize = Math.round(canvasHeight / 7);
                break;
              case windoWidth < 750:
                fontSize = Math.round(canvasHeight / 6);
                break;
              case windoWidth < 850:
                fontSize = Math.round(canvasHeight / 5);
                break;
              default:
                fontSize = Math.round(canvasHeight / 4);
                break;
            }

            ctx.canvas.width = canvasWidth + radius;
            ctx.canvas.height = canvasHeight;

            ctx.beginPath();

            if (j) {
              ctx.arc(x1, centerY, radius, Math.PI / 2, Math.PI * 1.5, true);
            }

            ctx.lineTo(0, y1);
            ctx.lineTo(0, 0);
            ctx.lineTo(canvasWidth, 0);
            ctx.lineTo(canvasWidth, y1);

            if (j !== wordCount - 1) {
              ctx.arc(canvasWidth, centerY, radius, Math.PI * 1.5, Math.PI / 2, false);
            }

            ctx.lineTo(canvasWidth, y2);
            ctx.lineTo(canvasWidth, canvasHeight);
            ctx.lineTo(0, canvasHeight);
            ctx.lineTo(0, y2);

            if (!j) {
              ctx.lineTo(0, y1);
            }

            ctx.clip();

            ctx.drawImage(img, startXPointCropImage,
              startYPointCropImage, canvasWidth + radius,
              canvasHeight, 0, 0, canvasWidth + radius, canvasHeight);
            ctx.shadowColor = '#006064';
            ctx.strokeStyle = '#01579b';
            ctx.shadowBlur = 1;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalCompositeOperation = 'destination-in';
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            // ctx.shadowColor = '#b2ebf2 ';
            ctx.shadowBlur = 10;
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#0277bd';
            const fontType = 'normal';
            const fontRatio = 1;
            const fontFamily = 'Arial';
            const solidTextColor = '#81d4fa';
            const fontStyle = 'fillText';
            ctx.font = `${fontType} ${fontSize * fontRatio}pt ${fontFamily}`;
            ctx.textAlign = 'center';
            ctx.fillStyle = solidTextColor;
            ctx[fontStyle](word, canvasWidth / 2 + radius / 2, canvasHeight / 2 + fontSize / 3);
            row.append(canvas);
          });
          startYPointCropImage += canvasHeight;
          result.push(row);
        });
        resolve(result);
      };

      img.onerror = (err) => reject(err);
    });
  }

  async renderPuzzleElementsToDom(imageSrc, sentences) {
    // console.log('hello');
    const puzzleArr = await this.getPuzzleElements(imageSrc, sentences);
    if (!puzzleArr) {
      // handle promise error e.g. try another imageSrc
      console.log('puzzleArr error');
    }

    const dropPanel = document.querySelector(`.${engPuzConst.content.DROPSECTION}`);
    const puzzleContainer = document.createElement('div');
    puzzleContainer.classList.add('card-panel');

    puzzleArr.forEach((element) => {
      puzzleContainer.appendChild(element);
    });
    dropPanel.appendChild(puzzleContainer);
  }
}
