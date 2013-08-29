// example controller, for Conway's Game of Life
// app: ngApp
// template: gol.html
// put the short code [angular-view app=ngApp controller=GoLCtrl template=gol.html]
controllers.controller('GoLCtrl', ['$scope', '$timeout', '_', function ($scope, $timeout, _) {
    $scope.stopped = true;
    $scope.interval = 200;
    $scope.population = 0;
    $scope.dimensions = {'rows': 15, 'cols': 20, 'minimum': 10, 'maximum': 100};
    $scope.board = [
        []
    ];

    $scope.stop = function () {
        $scope.stopped = true;
    };

    $scope.start = function () {
        $scope.stopped = false;
        $timeout($scope.cycle, $scope.interval);
    };

    $scope.resizeBoard = function () {
        function bounded(value, lo, hi) {
            return value > hi ? hi : value < lo ? lo : value;
        }

        var rows = bounded($scope.dimensions.rows, $scope.dimensions.minimum, $scope.dimensions.maximum);
        var cols = bounded($scope.dimensions.cols, $scope.dimensions.minimum, $scope.dimensions.maximum);

        $scope.dimensions.rows = rows;
        $scope.dimensions.cols = cols;

        var oldRows = _.size($scope.board);
        var oldCols = _.size(_.first($scope.board));

        function newRow(cols, row) {
            return _.range(cols).map(function (col) {
                if (row >= oldRows || col >= oldCols)
                    return { thisGen: false, nextGen: false };
                else
                    return { thisGen: $scope.board[row][col].thisGen,
                        nextGen: $scope.board[row][col].nextGen };
            })
        }

        $scope.board = _.range(rows).map(function (row) {
            return newRow(cols, row);
        });
    };

    $scope.toggle = function (cell) {
        cell.thisGen = !cell.thisGen;
        $scope.population = $scope.getPopulation();
    };

    $scope.generate = function (row, col) {
        var cell = $scope.board[row][col];
        var neighbours = [
            {dx: -1, dy: -1},
            {dx: 0, dy: -1},
            {dx: 1, dy: -1},
            {dx: 1, dy: 0},
            {dx: 1, dy: 1},
            {dx: 0, dy: 1},
            {dx: -1, dy: 1},
            {dx: -1, dy: 0}
        ];

        var ln = _.reduce(neighbours, function (memo, n) {
            var nx = col + n.dx;
            var ny = row + n.dy;
            var rows = _.size($scope.board);
            var cols = _.size(_.first($scope.board));

            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                return memo + ($scope.board[ny][nx].thisGen ? 1 : 0);
            } else {
                return memo;
            }
        }, 0);

        // conditions for life
        cell.nextGen = (cell.thisGen && ln >= 2 && ln <= 3)
            || (!cell.thisGen && ln == 3);
    };

    function boardWalk(board, fn) {
        var rows = _.size($scope.board);
        var cols = _.size(_.first($scope.board));

        _.each(_.range(rows), function (row) {
            _.each(_.range(cols), function (col) {
                fn(row, col);
            })
        })
    }

    $scope.generateBoard = function () {
        boardWalk($scope.board, function (row, col) {
            $scope.generate(row, col);
        });
    };

    $scope.updateBoard = function () {
        boardWalk($scope.board, function (row, col) {
            $scope.board[row][col].thisGen = $scope.board[row][col].nextGen;
        });
    };

    $scope.getPopulation = function () {
        population = 0;

        boardWalk($scope.board, function (row, col) {
            population += $scope.board[row][col].thisGen ? 1 : 0;
        });

        return population;
    };

    $scope.cycle = function () {
        if (!$scope.stopped) {
            $scope.generateBoard();
            $scope.updateBoard();
            $scope.population = $scope.getPopulation();

            $scope.stopped = $scope.population == 0;

            $timeout($scope.cycle, $scope.interval);
        }
    };

    $scope.resizeBoard();
}]);

