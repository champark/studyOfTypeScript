var Dict = /** @class */ (function () {
    function Dict() {
        this.words = {}; // 딕셔너리 초기화
    }
    Dict.prototype.add = function (word) {
        if (this.words[word.term] === undefined) { // 만약 주어진 단어가 아직 사전에 존재하지 않을 경우
            this.words[word.term] = word.def;
        }
    };
    Dict.prototype.get = function (term) {
        return this.words[term];
    };
    Dict.prototype.delete = function (term) {
        if (this.words[term] !== undefined) {
            delete this.words[term];
        }
    };
    Dict.prototype.update = function (term, def) {
        if (this.words[term] !== undefined) {
            this.words[term] = def;
        }
    };
    Dict.prototype.showAll = function () {
        return Object.keys(this.words).forEach(function (term) { return console.log(term); });
    };
    Dict.prototype.count = function () {
        return Object.keys(this.words).length;
    };
    Dict.prototype.upsert = function (word) {
        this.words[word.term] = word.def;
    };
    Dict.prototype.exists = function (term) {
        if (this.words[term] === undefined) {
            return "죄송하지만 해당 단어(" + term + ")는 등록되어있지 않습니다.";
        }
        else {
            return "네 해당 단어(" + term + ")는 등록되어있는 단어입니다.";
        }
    };
    Dict.prototype.bulkAdd = function (bulk) {
        var _this = this;
        bulk.forEach(function (word) {
            if (_this.words[word.term] === undefined)
                _this.words[word.term] = word.def;
        });
    };
    Dict.prototype.bulkDelete = function (bulk) {
        var _this = this;
        bulk.forEach(function (term) {
            if (_this.words[term] !== undefined)
                delete _this.words[term];
        });
    };
    return Dict;
}());
var Word = /** @class */ (function () {
    function Word(term, def) {
        this.term = term;
        this.def = def;
    }
    return Word;
}());
var kimchi = new Word("kimchi", "한국의 대표적 음식");
var bulgogi = new Word("bulgogi", "한국식 바베큐");
var dict = new Dict();
dict.add(kimchi);
dict.add(bulgogi);
console.log("get()결과 : " + dict.get("kimchi"));
console.log("delete()실행");
//dict.delete("kimchi")
dict.update("kimchi", "매운 샐러드이다.");
console.log("get()결과 : " + dict.get('kimchi'));
//console.log("showAll()결과 : " +dict.showAll());
console.log("count()결과 : " + dict.count());
dict.upsert(new Word("kimchi", "김치는 한국의 대표적 음식이 아니지 않습니다."));
dict.upsert(new Word("upsert테스트용", "저는 테스트입니다."));
console.log(dict.get("kimchi"));
console.log(dict.get("upsert테스트용"));
console.log("exists()결과 : " + dict.exists("kimchi"));
dict.bulkAdd([{ term: "blackKimchi", def: "검은김치??" }, { term: "blueKimchi", def: "파란김치?!" }, { term: "purpleKimchi", def: "보라색김치??!" }]);
console.log("bulkAdd()뒤 showAll() :");
dict.showAll();
dict.bulkDelete(["kimchi", "bulgogi", "blackKimchi", "upsert테스트용", "blueKimchi", "purpleKimchi"]);
console.log("bulkDelete()뒤 showAll() :");
dict.showAll();
