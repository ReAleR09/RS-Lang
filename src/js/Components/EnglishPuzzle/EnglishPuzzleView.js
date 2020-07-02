/* eslint-disable class-methods-use-this */
import engPuzConst from './EnglishPuzzleConstants';

export default class EnglisPuzzleView {
  attach(element) {
    this.element = element;
    this.dropContainer = this.element.querySelector(`.${engPuzConst.content.DROPSECTION}`);
  }

  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }

  renderCurrentStat(answers) {
    let fragment = '';
    let i = 0;
    Object.values(answers).forEach((value) => {
      fragment += `<div class="fullWidth flex-center margin-bottom">
      <a class="btn waves-effect blue lighten-4">
      <i class="engPuz__tooltips-autoPlay--results large material-icons" data-word=${i}>volume_up</i>
      </a>
        <div class="fullWidth ${value.isCorrect ? 'green' : 'red'}">${value.sentence}</div>
      </div>`;
      i += 1;
    });

    const container = document.querySelector(`.${engPuzConst.content.DROPSECTION}`);
    console.log(fragment);
    container.insertAdjacentHTML('afterbegin', fragment);
  }

  hideTooltipsBtns() {
    const tooltipSection = this.element.querySelector('.engPuz__tooltips-section');
    tooltipSection.classList.add('noPointer');
  }

  removeDragContainer() {
    const dragContainer = this.element.querySelector(`.${engPuzConst.content.DRAGSECTION}`);
    dragContainer.remove();
  }

  renameCheckButton() {
    const checkBtn = document.querySelector(`.${engPuzConst.buttons.CHECK}`);
    if (checkBtn.innerText === 'CHECK') {
      checkBtn.innerText = 'CONTINUE';
    } else {
      checkBtn.innerText = 'CHECK';
    }
  }

  updateTemplateShadow(elem) {
    this.templateShadow.appendChild(elem);
  }

  removePuzzleLinePointerEvents(lineIndex) {
    const puzzleRow = document.querySelector(`.${engPuzConst.content.DROPSECTION} .row-${lineIndex}`);
    puzzleRow.classList.add('noPointer');
  }

  toggleGreyBtnBackground(btn) {
    btn.classList.toggle('lighten-4');
  }

  toggleDisableButton(idkBtn) {
    idkBtn.classList.toggle('disabled');
  }

  renderPaintingInfo(info) {
    const infoEl = document.querySelector('.engPuz__translation');
    infoEl.innerText = info;
  }

  drawCompletePuzzle() {
    const puzzleContainer = document.querySelector(`.${engPuzConst.content.DROPSECTION}`);
    this.clearContainer(puzzleContainer);
    const img = document.createElement('img');
    img.src = this.puzzleImage;

    puzzleContainer.appendChild(img);
  }

  togglePlayBtn() {
    this.element.querySelector('a.engPuz__audio').classList.toggle('disabled');
  }

  addCanvasHighlight(puzzleLineIndex) {
    const canvasDropToCheck = document.querySelectorAll(`.${engPuzConst.content.DROPSECTION} .canvas-row-${puzzleLineIndex + 1}`);
    [...canvasDropToCheck].forEach((canvas, i) => {
      // eslint-disable-next-line no-unused-expressions
      canvas.dataset.item === `${puzzleLineIndex + 1}-${i + 1}`
        ? canvas.classList.add('canvas-green') : canvas.classList.add('canvas-red');
    });
  }

  renderTranslation(words, lineIndex) {
    const translation = document.querySelector('.engPuz__translation');
    translation.innerText = words[lineIndex].textExampleTranslate;
  }

  toggleTranlation(e) {
    if (e.target.classList.contains('engPuz__tooltips-translation')) {
      document.querySelector('blockquote').classList.toggle('visually-hidden');
      this.toggleGreyBtnBackground(e.target.parentNode);
    }
  }

  removeCanvasHighlight(puzzleLineIndex) {
    const canvasDropToCheck = document.querySelectorAll(`.${engPuzConst.content.DROPSECTION} .canvas-row-${puzzleLineIndex + 1}`);
    [...canvasDropToCheck].forEach((canvas) => {
      canvas.classList.remove('canvas-red', 'canvas-green');
    });
  }

  getGameLayout() {
    const html = `
    <div>
    <div class="engPuz__tooltips-section">
    <div class="flex-between EP-start__buttons">
    <div class="engPuz__settings flex-center">
    </div>
    <div class="engPuz__tooltips flex-between">
      <a class="engPuz__tooltips-autoPlay teal btn-floating waves-effect"> <i class="engPuz__tooltips-autoPlay medium material-icons">volume_up</i></a>
      <a class="engPuz__tooltips-translation teal btn-floating circle waves-effect"> <i class="engPuz__tooltips-translation medium material-icons">translate</i></a>
      <a class="engPuz__tooltips-audioSwitcher teal btn-floating circle waves-effect"> <i class="engPuz__tooltips-audioSwitcher medium material-icons">music_video</i></a>
      <a class="engPuz__tooltips-picture btn-floating teal circle waves-effect"> <i class="engPuz__tooltips-picture medium material-icons">photo</i></a>
    </div>
    </div>
    <div class="flex-center">
    <a class="engPuz__audio #ffb74d orange lighten-2 center btn waves-effect waves-purple "><i class="engPuz__audio material-icons">volume_up</i></a>
    </div>
    <div class="flex-center">
    <blockquote class="engPuz__translation center flex-center"></blockquote>
    </div>
    </div>
    <div id="engPuz__drop-section" class="engPuz__drop-section card-panel">
      <div class="engPuz__drop-section--line row-0 flex-center"></div>
      <div class="engPuz__drop-section--line row-1 flex-center"></div>
      <div class="engPuz__drop-section--line row-2 flex-center"></div>
      <div class="engPuz__drop-section--line row-3 flex-center"></div>
      <div class="engPuz__drop-section--line row-4 flex-center"></div>
      <div class="engPuz__drop-section--line row-5 flex-center"></div>
      <div class="engPuz__drop-section--line row-6 flex-center"></div>
      <div class="engPuz__drop-section--line row-7 flex-center"></div>
      <div class="engPuz__drop-section--line row-8 flex-center"></div>
      <div class="engPuz__drop-section--line row-9 flex-center"></div>
    </div>
    <div id="engPuz__drag-section" class="engPuz__drag-section card-panel flex-between"></div>
      <div class="engPuz__bottom-btn flex-center">
      <a class="engPuz__bottom-idk #fce4ec pink lighten-3 btn waves-effect">don't know</a>
      <a class="engPuz__bottom-check #81c784 green lighten-1 btn waves-effect">Check</a>
      </div>
    </div>
    `;
    return html;
  }

  getPuzzleElements(imgSrc, wordsList) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.src = imgSrc;
      this.puzzleImage = imgSrc;

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
    const puzzleArr = await this.getPuzzleElements(imageSrc, sentences);
    if (!puzzleArr) {
      // handle promise error e.g. try another imageSrc
      console.log('image loading error');
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
