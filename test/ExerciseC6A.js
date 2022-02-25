
var Test = require('../config/testConfig.js');
const truffleAssert = require('truffle-assertions');

contract('ExerciseC6A', async (accounts) => {

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
  });


  it('contract operational status works properlu', async () => {
    
    // ARRANGE
    let caller = accounts[0];

    // ACT
    //let result = await config.exerciseC6A.isOperational(caller);
    let result = await config.exerciseC6A.isOperational({from: config.owner}); 

    // ASSERT
    assert.equal(result, false, "Contract should be inoperational initally");

    // Set the status to operational
    await config.exerciseC6A.setOperatingStatus(true, {from: config.owner});
    result = await config.exerciseC6A.isOperational({from: config.owner});
    assert.equal(result, true, "Contract should be operational now");


    //Set the status from a non-owner account. this should fail
    await truffleAssert.fails(
      config.exerciseC6A.setOperatingStatus(true, {from: config.testAddresses[1]}),
      "Caller is not contract owner"
    );

  });


  it('contract owner can register new user', async () => {
    
    // ARRANGE
    let caller = accounts[0]; // This should be config.owner or accounts[0] for registering a new user
    let newUser = config.testAddresses[0]; 

    // ACT
    await config.exerciseC6A.registerUser(newUser, false, {from: caller});
    let result = await config.exerciseC6A.isUserRegistered.call(newUser); 

    // ASSERT
    assert.equal(result, true, "Contract owner cannot register new user");

  });

});
