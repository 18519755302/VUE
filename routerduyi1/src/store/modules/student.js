export default {
    state: {
        studentList: [],
    },
    getters: {
        studentsLength(state) {
            return state.studentList.length;
        },
        studentsUnderAge(state) {
            return state.studentList.filter(item => {
                return item.age < 18
            })
        }

    },
};