var moment = require('moment');

pivotTable = function() {
    var task,
        user,
        week,
        addUser = function(usr) {
            user.push(usr);
            task.push({ Name: usr, week: null });
        },
        hasUser = function(usr) {
            return user.indexOf(usr) == -1;
        },
        addWeek = function(weeks) {
            if (hasWeek(weeks)) {
                week.push(weeks);
            }
            task.forEach(function(item) {
                if (!item.week) {
                    item.week = {};
                    item.week[weeks] = 0;
                }
            })
        },
        hasWeek = function(weeks) {
            return week.indexOf(weeks) == -1;
        },
        updateData = function(usr, wk, data) {
            task.forEach(function(item) {
                if (item.Name == usr) {
                    item.week[wk] = data;
                }
            });
        };
    return {
        getTable: function(data, row, column) {
            var tsk = {};
            task = [];
            week = [];
            user = [];
            data.forEach(function(item) {
                var weeks = moment(item.weekstartson, 'DD-MM-YYYY').format('YYYY-MM-DD');
                (hasUser(item[row])) ? addUser(item[row]): null;
                addWeek(weeks);
                updateData(item[row], weeks, item[column]);
            });
            tsk.task = task;
            tsk.week = week;
            tsk.user = user;
            return tsk;
        }
    }
}

module.exports = pivotTable;