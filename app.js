web3 = new Web3(new Web3.providers.HttpProvider("HTTP://169.254.251.156:7545"));//这里填入Ganache测试账户中url
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
VotingContract = web3.eth.contract(abi);


contractInstance = VotingContract.at('0x824E15dE189FFad20a79BA35eF16A9E6e55af486');//单引号中输入你remix部署的智能合约地址

candidates = {"Alice": "candidate-1","Bob": "candidate-2","Cary":"candidate-3"}

function voteForCandidate() {
    console.log(candidate);
    candidateName = $("#candidate").val();
    console.log(candidateName);
    contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
        let div_id = candidates[candidateName];
        console.log(contractInstance.totalVotesFor.call(candidateName).toString());
        $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
    });
    console.log(contractInstance.totalVotesFor.call(candidateName).toString());
}

$(document).ready(function() {
    candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        let val = contractInstance.totalVotesFor.call(name).toString()
        $("#" + candidates[name]).html(val);
    }
});

