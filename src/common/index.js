/**
 * 功能： 业务工具类
 */

class Helper {
    static makeActionCreator(type, ...argNames) {
        // 生成静态acionCreator
        return (...args) => {
            const action = { type };

            argNames.forEach((arg, index) => {
                action[arg] = args[index];
            });

            return action;
        };
    }

    static createReducer(initialState, handlers) {
        // 生成reducer
        return (state = initialState, action) => {
            if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
                return handlers[action.type](state, action);
            }
            return state;
        };
    }

    static decimal(e) {
        const nKeyCode = e.which;
        const sValues = e.currentTarget.value;

        if (
            nKeyCode === 13 ||
            nKeyCode === 8 ||
            nKeyCode === 46 ||
            (nKeyCode >= 37 && nKeyCode <= 40) ||
            (nKeyCode >= 48 && nKeyCode <= 57) ||
            (nKeyCode >= 96 && nKeyCode <= 105) ||
            nKeyCode === 190 ||
            nKeyCode === 110
        ) {
            // 是否已包含小数点
            if (nKeyCode === 190 || nKeyCode === 110) {
                return sValues.includes('.');
            }

            return false;
        }

        return false;
    }

    static validatePhone(sPhone) {
        const nLen = sPhone.length;

        if (nLen !== 11 || (nLen === 11 && !/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(sPhone))) {
            return false;
        }
        return true;
    }

    static validateEmail(email) {
        return new RegExp('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$').test(email);
    }

    static needMenu = (findTagName) =>
        function findParent(childNode) {
            const childTagName = childNode.tagName.toLowerCase();
            if (childTagName === findTagName) {
                return true;
            }
            const { parentNode } = childNode;
            if (!parentNode) return false;
            const parentTagName = parentNode.tagName.toLowerCase();
            if (parentTagName === 'body') return false;
            if (parentTagName === findTagName) {
                return true;
            }
            return findParent.call(null, parentNode);
        };
}

export default Helper;
