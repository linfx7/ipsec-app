
/**
 * @param callback(ruleList) callback function to handle rules
 */
function getRules(callback) {
    $.ajax({
        url: '/api/IPsec:rule-all',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        contentType:'application/json',
        success:function(data){
            var ruleList = JSON.parse(data.output.result)
            callback(ruleList)
        }
    });
}

/**
 * add a rule to the end of the rule list
 * @param rule rule to be added
 * @param callback(result) callback function to handle result
 */
function addRule(rule, callback) {
    var jsonInput = {input: rule};
    $.ajax({
        url: '/api/IPsec:rule-add',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        data: JSON.stringify(jsonInput),
        contentType:'application/json',
        success:function(data){
            callback(data.output.result)
        }
    });
}


/**
 * insert a rule to the given position of the rule list
 * @param rule rule to be added
 * @param pos position to insert
 * @param callback(result) callback function to handle result
 */
function insertRule(rule, pos, callback) {
    rule.pos = pos;
    addRule(rule, callback);
}

/**
 * delete a rule in the given position of the rule list
 * @param pos position to delete
 * @param callback(result) callback function to handle result
 */
function deleteRule(pos, callback) {
    var jsonInput = {input: {position: pos}};
    $.ajax({
        url: '/api/IPsec:rule-del',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        data: JSON.stringify(jsonInput),
        contentType:'application/json',
        success:function(data){
            callback(data.output.result)
        }
    });
}

/**
 * @param callback(connList) callback function to handle conns
 */
function getConns(callback) {
    $.ajax({
        url: '/api/IPsec:conn-all',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        contentType:'application/json',
        success:function(data){
            var connList = JSON.parse(data.output.result)
            callback(connList)
        }
    });
}

/**
 * if have an existing conn with the same name, then update, if not add
 * @param conn conn to be added/updated
 * @param callback(result) callback function to handle result
 */
function putConn(conn, callback) {
    var jsonInput = {input: conn}
    $.ajax({
        url: '/api/IPsec:conn-add',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        data: JSON.stringify(jsonInput),
        contentType:'application/json',
        success:function(data){
            callback(data.output.result)
        }
    })
}

/**
 * delete a connection
 * @param name conn to be deleted
 * @param callback(result) callback function to handle result
 */
function deleteConn(name, callback) {
    var jsonInput = {input: {name: name}};
    $.ajax({
        url: '/api/IPsec:conn-del',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        data: JSON.stringify(jsonInput),
        contentType:'application/json',
        success:function(data){
            callback(data.output.result)
        }
    })
}

/**
 * @param callback(gatewayList) callback function to handle conns
 */
function getGateways(callback) {
    $.ajax({
        url: '/api/IPsec:gateway-all',
        username: 'admin',
        password: 'admin',
        type: 'POST',
        contentType:'application/json',
        success:function(data){
            var gatewayList = JSON.parse(data.output.result)
            callback(gatewayList)
        }
    });
}

