const strategies = {
  isNoEmpty() {
    return this.value === '' ? 
      this.error : void 0
  },
  compare() {
    return this.value !== this.another ? 
      this.error : void 0
  },
  minLength() {
    return this.value.length < this.length ? 
      this.error : void 0
  },
  maxLength() {
    return this.value.length < this.length ? 
      this.error : void 0
  },
  isPhoneNumber() {
    return !/^1(3|5|7|8|9)[0-9]{9}$/.test(this.value) ? 
      this.error : void 0
  },
  isEmail() {
    return !/^([a-zA-Z0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.value) ?
      this.error : void 0
  }
}

export default class Validator {
  constructor() {
    this.cache = {
      blur: []
      //...other conditions
    }
    this.checkEvent = {}
    this.valid = true
  }

  add(value, trigger, rules) {
    for(let rule of rules) {
      let strategyArray = rule.strategy.split(':')
      let error = rule.errorMessage
      
      this.cache[trigger].push(() => {
        let strategy = strategyArray.shift()
        let second = strategyArray.shift()
        if(strategy === 'compare') {
          return strategies[strategy].apply({
            value,
            error,
            another: second
          })
        } else if(strategy === 'minLength' || strategy === 'maxLength') {
          return strategies[strategy].apply({
            value,
            error,
            length: second
          })
        } else {
          return strategies[strategy].apply({
            value,
            error
          })
        }
      })
    }
  }

  check(event, resolve, reject) {
    this.valid = true
    while(this.cache[event].length != 0) {
      let validator = this.cache[event][0]
      let errorMessage = validator()
      if (errorMessage) {
        reject(errorMessage)
        this.valid = false
      } else {
        resolve()
      }
      this.cache[event].splice(0, 1)
    }
  }
}
