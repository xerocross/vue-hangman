module.exports = function Observable (subscribeFunction) {
    let self = this;
    this.subscriberUpdateFunction = function() {}
    this.observer = {
        next : function(val) {
            self.subscriberUpdateFunction(val);
        }
    };
    this.subscribe = (subFunction) => {
        this.subscriberUpdateFunction = subFunction
        subscribeFunction(this.observer);
    }
    this.next = function(val) {
        this.subscriberUpdateFunction(val);
    }
}