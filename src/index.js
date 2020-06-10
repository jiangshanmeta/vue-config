function mergeStrategy (toVal, fromVal) {
    if (!toVal) {
        return fromVal;
    }
    if (!fromVal) {
        return toVal;
    }
    const target = Object.create(null);
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(toVal));
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(fromVal));
    return target;
}

export default {
    install (Vue, {
        optionKeys = [
            'config',
        ],
    } = {}) {
        optionKeys.forEach((optionKey) => {
            Vue.config.optionMergeStrategies[optionKey] = mergeStrategy;
        });

        Vue.mixin({
            beforeCreate () {
                optionKeys.forEach((optionKey) => {
                    const config = this.$options[optionKey];
                    if (!config || typeof config !== 'object') {
                        return;
                    }
                    Object.defineProperties(this, Object.getOwnPropertyDescriptors(config));
                });
            },
        });
    },
};
