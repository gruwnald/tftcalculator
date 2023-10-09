function level_coefficient(level, cost) {
    var lev = {1: [1, 0, 0, 0, 0], 2: [1, 0, 0, 0, 0], 3: [0.75, 0.25, 0, 0, 0], 4: [0.55, 0.30, 0.15, 0, 0],
        5: [0.45, 0.33, 0.20, 0.02, 0], 6: [0.25, 0.40, 0.30, 0.05, 0], 7: [0.19, 0.30, 0.35, 0.15, 0.01],
        8: [0.15, 0.20, 0.35, 0.25, 0.05], 9: [0.10, 0.15, 0.30, 0.30, 0.15], 10: [0.05, 0.10, 0.20, 0.40, 0.25],
        11: [0.01, 0.01, 0.12, 0.50, 0.35]};
    return lev[level][cost-1];
}

function unit_ammount(cost) {
    var units = {1:13, 2:13, 3:13, 4:12, 5:8};
    return units[cost];
}

function unit_copies(cost) {
    var units = {1:29, 2:22, 3:18, 4:12, 5:10};
    return units[cost];
}

function probabilityCalculator(a, b, cost, level, gold, copies) {
    var transition_matrix = math.zeros((10, 10));
    for (i=0; i<9; i++) {
        p = level_coefficient(level, cost)*(Math.max(unit_copies(cost)-(a+i), 0))/(unit_ammount(cost)*unit_copies(cost)-(b+i));
        transition_matrix.set([i, i], 1-p);
        transition_matrix.set([i, i+1], p);
    }
    transition_matrix.set([9, 9], 1);
    var n = Math.floor((gold - copies*cost)/2)*5;
    transition_matrix = math.pow(transition_matrix, n);
    return transition_matrix.get([0, copies]);
}

function result() {
    var level = document.querySelector('input[id="level"]:checked').value;
    var cost = document.querySelector('input[id="cost"]:checked').value;
    var gold = document.getElementById("gold").value;
    var gone_units_wanted = document.getElementById("gone_units_wanted").value;
    var gone_units_all = document.getElementById("gone_units_all").value;

    document.getElementById("p1").innerHTML = ''
    document.getElementById("p2").innerHTML = ''

    if (level && cost && gold && gone_units_wanted && gone_units_all) {
        level = Number(level);
        cost = Number(cost);
        gold = Number(gold);
        gone_units_wanted = Number(gone_units_wanted);
        gone_units_all = Number(gone_units_all);
        
        var p1 = (100 * probabilityCalculator(gone_units_wanted, gone_units_all, cost, level, gold, 1)).toFixed(2);
        var p2 = (100 * probabilityCalculator(gone_units_wanted, gone_units_all, cost, level, gold, 2)).toFixed(2);
        var p3 = (100 * probabilityCalculator(gone_units_wanted, gone_units_all, cost, level, gold, 3)).toFixed(2);
        var p4 = (100 * probabilityCalculator(gone_units_wanted, gone_units_all, cost, level, gold, 4)).toFixed(2);
        var p5 = (100 * probabilityCalculator(gone_units_wanted, gone_units_all, cost, level, gold, 5)).toFixed(2);
        var p6 = (100 * probabilityCalculator(gone_units_wanted, gone_units_all, cost, level, gold, 6)).toFixed(2);
        var p7 = (100 * probabilityCalculator(gone_units_wanted, gone_units_all, cost, level, gold, 7)).toFixed(2);
        var p8 = (100 * probabilityCalculator(gone_units_wanted, gone_units_all, cost, level, gold, 8)).toFixed(2);
        var p9 = (100 * probabilityCalculator(gone_units_wanted, gone_units_all, cost, level, gold, 9)).toFixed(2);
        
        document.getElementById("p1").innerHTML = '<span class="green">'+p1+'</span>' + '%';
        document.getElementById("p2").innerHTML = '<span class="green">'+p2+'</span>' + '%';
        document.getElementById("p3").innerHTML = '<span class="green">'+p3+'</span>' + '%';
        document.getElementById("p4").innerHTML = '<span class="green">'+p4+'</span>' + '%';
        document.getElementById("p5").innerHTML = '<span class="green">'+p5+'</span>' + '%';
        document.getElementById("p6").innerHTML = '<span class="green">'+p6+'</span>' + '%';
        document.getElementById("p7").innerHTML = '<span class="green">'+p7+'</span>' + '%';
        document.getElementById("p8").innerHTML = '<span class="green">'+p8+'</span>' + '%';
        document.getElementById("p9").innerHTML = '<span class="green">'+p9+'</span>' + '%';
    }
}