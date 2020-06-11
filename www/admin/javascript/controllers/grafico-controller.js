angular.module('controlei')
.controller('GraficoController', ['$scope', '$uibModal', '$log', '$document', '$location', '$window', '$filter', 'LoginService', '$rootScope', '$localStorage', 
	function ($scope, $uibModal, $log, $document, $location, $window, $filter, LoginService, $rootScope, $localStorage) {

    var apresentarGrafico = function(disponivel, utilizado, total){
        var ctx = document.getElementById("myChart");
        var ctx2 = document.getElementById("myChart2");

        var config = {
            type: 'doughnut',
            data: {
                labels: [
                    "Disponível R$ ",
                    "utilizado R$ ",
                ],
                datasets: [{
                    label: '%',
                    data: [disponivel, utilizado],
                    // data: [671.18, 2028.82],
                    backgroundColor: [
                        "#32395d", //escuro (utilizado)
                        "#ABA8B1", //claro (disponível)
                    ],
                    hoverBackgroundColor: [
                        "#444f87",
                        "#b7b5bc",
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                showPercentage: true, //Enables percentages on the pie
                title: {
                    display: false,
                    text: 'USO DO LIMITE NO PERÍODO'
                },
                legend: {
                    display: false,
                },
                tooltips: {
                    displayColors: true,
                    position: 'nearest',
                    enabled: true,
                    mode: 'single',
                    callbacks: {
                        label: function(tooltipItems, data) { 
                            return '  R$ ' + data.datasets[0].data[tooltipItems.index];
                        },
                    }
                },
                animation: {
                    animateScale: true,
                },
                elements: {
                    center: {
                        // the longest text that could appear in the center
                        maxText: '100%',
                        text: parseInt((disponivel/total)*100)+'%',
                        fontColor: '#32395d',
                        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        fontStyle: 'normal',
                        // fontSize: 12,
                        // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
                        // if these are not specified either, we default to 1 and 256
                        minFontSize: 1,
                        maxFontSize: 256,
                    }
                }
            }
        }

        var meses = ["01/08", "01/08", "02/08", "03/08", "04/08", "04/08", "05/08", "05/08", "05/08", "05/08", "05/08", "05/08", "06/08", "09/08", "10/08", "10/08", "10/08", "10/08", "12/08", "12/08", "12/08", "15/08", "15/08", "19/08", "20/08", "20/08", "20/08", "20/08", "20/08", "20/08", "25/08", "26/08", "30/08", "30/08", "30/08"];
        var valoresDasContas = [0.00, -300.00, -25.90, 4000.00, 200.00, -388.30, 670.00, 500.00, 350.00, -482.03, -230.00, -624.00, -31.67, -500.00, -277.66, -225.09, -294.35, -298.22, -704.00, -22.20, -1900.00, 4020.97, -352.00, -22.90, 850.00, -400.00, -950.00, -59.90, -1779.37, -530.00, -1500.00, -29.35, 500.00, -92.79, -1000.00];
        var valoresDoGrafico = [-440.06, -740.06, -765.96, 3234.04, 3434.04, 3045.74, 3715.74, 4215.74, 4565.74, 4083.71, 3853.71, 3229.71, 3198.04, 2698.04, 2420.38, 2195.29, 1900.94, 1602.72, 898.72, 876.52, -1023.48, 2997.49, 2645.49, 2622.59, 3472.59, 3072.59, 2122.59, 2062.69, 283.32, -246.68, -1746.68, -1776.03, -1276.03, -1368.82, -2368.82, -2368.82, -2368.82, -2368.82];
        var movimentacoes = ["mes anterior", "itau - festa", "Tarifa Itau", "Emprestimo Original", "aluguel cotia - diferença", "Iptu - AP (ago/Dez)", "Aluguel Jandira", "Gracie Barra", "Fotos Nayara", "Juros - Caixa", "Material de construção Telha Norte(1/10)", "natação", "Integrator - Waiso", "Creche do Fefê", "Seguro Carro (4/7)", "Condomínio - Casa", "Condomínio - AP", "Material de Construção Nascimento (5/10)", "Manutenção Carro (3/3)", "Tarifa Bradesco", "Cartão Santander", "GFT - adiantamento", "Condomínio - Terreno", "Netflix", "Aluguel Cotia", "Cartão Caixa 5/6", "Armário Escritorio (3/4)", "Internet", "Parcela Casa", "Armário cozinha (1/6)", "Cartão Ná Itau", "Tarifa Caixa", "GFT - pagamento", "Eletropaulo - Luz ( DA )", "Tia Cá Total R$ 1.000/9.500,00(parcela 1)"];
        var presets = window.chartColors;
        var utils = Samples.utils;

        var config2 = {
          type: 'line',
          data: {
            labels: meses,
            datasets: [
                    {
                        label: 'R$',
                        movimentacao: movimentacoes,
                        valoresDasContas: valoresDasContas,
                        data: valoresDoGrafico,
                        borderWidth: 2,
                        backgroundColor: utils.transparentize('rgb(255, 99, 132)'),
                        borderColor: presets.red,
                    }
                ]
          },
          options: {
            legend: {
                display: false
            },
            tooltips: {
                filter: function (tooltipItem) {
                    return tooltipItem.datasetIndex === 0;
                },
                callbacks: {
                    label: function(tooltipItem, data) {
                        var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || 'Other';
                        var movimentacao = data.datasets[tooltipItem.datasetIndex].movimentacao[tooltipItem.index] || 'Other';
                        var valorDoGrafico = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || 'Other';
                        var valorDaConta = data.datasets[tooltipItem.datasetIndex].valoresDasContas[tooltipItem.index] || 'Other';
                        var dia = data.labels[tooltipItem.index];
                        return dia + "-Banco: R$ " + valorDoGrafico + " - Movimentacao: "+ movimentacao + "(R$ "+valorDaConta+")";
                    }
                }
            },

            maintainAspectRatio: false,
            spanGaps: false,
            elements: {
                line: {
                    tension: 0.4
                }
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0
                    }
                }]
            }
          }
        }

        var myChart = new Chart(ctx, config);
        var myChart2 = new Chart(ctx2, config2);

    }

    var teste = function(){
        var valoresDasContas = [0.00, -300.00, -25.90, 4000.00, 200.00, -388.30, 670.00, 500.00, 350.00, -482.03, -230.00, -624.00, -31.67, -500.00, -277.66, -225.09, -294.35, -298.22, -704.00, -22.20, -1900.00, 4020.97, -352.00, -22.90, 850.00, -400.00, -950.00, -59.90, -1779.37, -530.00, -1500.00, -29.35, 500.00, -92.79, -1000.00];
        var valoresDoGrafico = [];
        var soma = 0;

        for (var i = 0; i <= valoresDasContas.length - 1; i++) {
            console.info(valoresDasContas[i]);

            soma += valoresDasContas[i];
            valoresDoGrafico.push(soma);
        }

        console.info(valoresDoGrafico);
    }

    init = function() {
        console.info("GraficoController");
        apresentarGrafico(111, 222, 333);
        // teste();
    };

	init();
}]);