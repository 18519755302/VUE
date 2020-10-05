//模仿源代码中的响应式的更新数组和对象 
let obj = {
    a: "a",
    b: "b",
    c: "c",
    def: {
        d: 'd',
        e: 'e',
        f: 'f'
    },
    arr: ['0', '1', '2']
}

//数组原生方法变异
let arrayProto = Array.prototype;
let arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'].forEach(function (method) {
    arrayMethods[method] = function () {
        arrayProto[method].call(this, ...arguments);
        //表示可以加渲染
        render();
    }
})


//使数组或对象响应式 （给数据添加监视）
function observer(data) {
    if (Array.isArray(data)) {
        console.log('进入数组了');
        data.__proto__ = arrayMethods;
        return;
    }

    if (typeof data === 'object') {
        for (let key in data) {
            defineProperty(data, key, obj[key]);
        }
    }
}


//对象 数据劫持
function defineProperty(obj, property, newValue) {
    observer(newValue);
    Object.defineProperty(obj, property, {
        get() {
            console.log('读！！！');
            return newValue;
        },
        set(value) {
            console.log('写！！！');
            if (newValue === value) {
                console.log('这个值已经有啦~~');
                return;
            }
            newValue = value;
            //证明可以渲染
            render();
        }
    });
}

function render() {
    console.log('渲染了');
}

//set方法
function $set(data, property, value) {
    if (Array.isArray(data)) {
        data.splice(property, 1, value);
        return value;
    }
    defineProperty(data, property, value);
    return value;
}

// $set(obj.arr, 1, 5);
// $set(obj, 'a', 1);
// console.log(obj);

//delete方法
function $delete(data, property) {
    if (Array.isArray(data)) {
        data.splice(property, 1);
        return;
    }
    delete data[property];
}

// $delete(obj.arr, 0);
// $delete(obj, 'a');
// console.log(obj);

//监视obj
observer(obj);

//检测数组原生方法变异是否好使
obj.arr.push(3);