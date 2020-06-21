class GetWords {
  constructor() {
    this.url = 'https://afternoon-falls-25894.herokuapp.com/words?page=2&group=0';
    this.count = 0;
  }

  async getWordsFromDataBase() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      this.gameLogic(data);
    } catch (error) {
      throw new Error('Ошибка при получении слов с сервера');
    }
  }

  gameLogic(data) {
    this.hz = 'hz';
    console.log(data);
    if (this.count <= data.length) {
      document.querySelector('.word-in-english').innerText = data[this.count].word;
      this.randomNum = Math.round(Math.random() * 1);
      document.querySelector('.translation-world').innerText = data[this.count + this.randomNum].wordTranslate;
    }
    document.getElementById('false-btn').addEventListener('click', () => {
      console.log('push false btn');
    });
    document.getElementById('true-btn').addEventListener('click', () => {
      console.log('push true btn');
    });
  }
}

export default GetWords;
