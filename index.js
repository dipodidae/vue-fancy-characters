var app = new Vue({

  el: '#app',
  
  data: () => {
    return {
      input: 'Hello World!',
      characterBytes: [],
      variation: null,
      conversions: {
        runes: {
          name: 'Elder Futhark yo',
          capitals: true,
          characters: `ᚨᛒᚳᛞᛖᚠᚷᚺᛁᛃᚲᛚᛗᚾᛟᛈᚦᚱᛋᛏᚢᛇᚹᛉᚣᛉ`,
          ligatures: [
            [/[^a-zA-Z\s+]+/g, ''],
            [/th/g, 'ᚦ'],
            [/\s+/g, '·'],
            [/ng/g, 'ᛜ'],
            [/x/g, 'ᚲᛋ'],
          ],
          wrap: '⋮'
        },
        oldEnglish: {
          name: 'Old English',
          characters: [
            '𝔞', '𝔟', '𝔠', '𝔡', '𝔢', '𝔣', '𝔤', '𝔥', '𝔦', '𝔧', '𝔨', '𝔩', '𝔪', '𝔫', '𝔬', '𝔭', '𝔮', '𝔯', '𝔰', '𝔱', '𝔲', '𝔳', '𝔴', '𝔵', '𝔶', '𝔷',
            '𝔄', '𝔅', 'ℭ', '𝔇', '𝔈', '𝔉', '𝔊', 'ℌ', 'ℑ', '𝔍', '𝔎', '𝔏', '𝔐', '𝔑', '𝔒', '𝔓', '𝔔', 'ℜ', '𝔖', '𝔗', '𝔘', '𝔙', '𝔚', '𝔛', '𝔜', 'ℨ'
          ]
        },
        fancy: {
          name: 'Fancy',
          capitals: true,
          characters: ['𝓪', '𝓫', '𝓬', '𝓭', '𝓮', '𝓯', '𝓰', '𝓱', '𝓲', '𝓳', '𝓴', '𝓵', '𝓶', '𝓷', '𝓸', '𝓹', '𝓺', '𝓻', '𝓼', '𝓽', '𝓾', '𝓿', '𝔀', '𝔁', '𝔂', '𝔃']
        }
      }
    }
  },

  computed: {
    output() {
      return this.format(this.input, this.variation)
    },
    displayBytes() {
      return this.characterBytes.reverse()
    },
    variations() {
      return Object.keys(this.conversions)
    }
  },

  methods: {
    format(text, variation) {

      if (!variation) {
        return text
      }

      this.characterBytes = []

      if (this.conversions[variation].ligatures) {
        this.conversions[variation].ligatures.forEach(ligature => {
          text = text.replace(ligature[0], ligature[1])
        })
      } 

      if (this.conversions[variation].wrap) {
        text = `${this.conversions[variation].wrap}${text}${this.conversions[variation].wrap}`
      }

      if (this.conversions[variation].capitals) {
        text = text.toLowerCase()
      }
      
      text = text.replace(/[a-z]/gi, (character) => {
        let characterByte = parseInt(character, 36) - 10
        let isCapital = character === character.toUpperCase()

        if (!this.conversions[variation].capitals && isCapital) {
          characterByte+=26
        }
 
        let outputCharacter = this.conversions[variation].characters[characterByte]
        
        return outputCharacter
      })

      return text
    },

    selectVariation(key) {

      this.variation = key
    },

    variationClass(key) {

      return {
        active: this.variation === key
      }
    }
  }
})