type Words = {
    [key: string]: string
}

class Dict {
    private words: Words
    constructor() {
        this.words = {} // 딕셔너리 초기화
    }
    add(word: Word) {
        if (this.words[word.term] === undefined) {    // 만약 주어진 단어가 아직 사전에 존재하지 않을 경우
            this.words[word.term] = word.def;
        }
    }
    get(term:string){
        return this.words[term]
    }
    delete(term:string) {
        if(this.words[term] !== undefined) {
            delete this.words[term]
        }
    }
    update(term: string, def: string) {
        if(this.words[term] !== undefined) {
            this.words[term] = def
        }
    }
    showAll() {
        return Object.keys(this.words).forEach(term => console.log(term))
    }
    count() {
        return Object.keys(this.words).length
    }
    upsert(word: Word) {
        this.words[word.term] = word.def;
    }
    exists(term: string) {
        if(this.words[term] === undefined) {
            return "죄송하지만 해당 단어("+ term +")는 등록되어있지 않습니다."
        } else {
            return "네 해당 단어("+ term +")는 등록되어있는 단어입니다."
        }
    }
    bulkAdd(bulk: Word[]) {
        bulk.forEach((word: Word) => {
            if(this.words[word.term] === undefined) 
            this.words[word.term] = word.def
        })
    }
    bulkDelete(bulk: string[]) {
        bulk.forEach((term: string) => {
            if(this.words[term] !== undefined)
            delete this.words[term]
        })
    }
}

class Word {
    constructor(
        public term: string,
        public def: string
    ) { }
}

const kimchi = new Word("kimchi", "한국의 대표적 음식")
const bulgogi = new Word("bulgogi", "한국식 바베큐")

const dict = new Dict()

dict.add(kimchi);
dict.add(bulgogi);
console.log("get()결과 : " +dict.get("kimchi"));
console.log("delete()실행");
//dict.delete("kimchi")
dict.update("kimchi", "매운 샐러드이다.");
console.log("get()결과 : " +dict.get('kimchi'));
//console.log("showAll()결과 : " +dict.showAll());
console.log("count()결과 : " +dict.count());
dict.upsert(new Word("kimchi","김치는 한국의 대표적 음식이 아니지 않습니다."));
dict.upsert(new Word("upsert테스트용","저는 테스트입니다."));
console.log(dict.get("kimchi"));
console.log(dict.get("upsert테스트용"));
console.log("exists()결과 : " +dict.exists("kimchi"));
dict.bulkAdd([{term:"blackKimchi", def:"검은김치??"}, {term:"blueKimchi", def: "파란김치?!"}, {term:"purpleKimchi", def: "보라색김치??!"}])
console.log("bulkAdd()뒤 showAll() :");
dict.showAll();
dict.bulkDelete(["kimchi", "bulgogi", "blackKimchi","upsert테스트용", "blueKimchi", "purpleKimchi"]);
console.log("bulkDelete()뒤 showAll() :");
dict.showAll();