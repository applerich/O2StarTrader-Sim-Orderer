var jar = require('request').jar();
var request = require('request').defaults({ jar: jar });
var cheerio = require('cheerio');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json'));

var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36';

var addressID;
var fs = require('fs');
var firstName = config.firstName;
var lastName = config.lastName;
var password = config.accountPassword;
var postcode = config.postcode;
var addressline1 = config.addressline1;
console.log("Attempting to create " + config.tasks + " Accounts");
for (var i = 0; i < config.tasks; i++) {
	var email = config.emailPrefix + Math.floor(Math.random() * 1000000000) + "@" + config.emailDomain;
	var mobileNumber = "07" + Math.floor(Math.random() * 1000000000);
	console.log(email);
	createAccountandOrderSim(email, mobileNumber)
}

function createAccountandOrderSim(emailParam, mobileNumberParam) {
	request.get({
			headers: {
				'user-agent': userAgent
			},
			url: 'https://www.o2startrader.co.uk/register'
		},
		function (error, response, body) {
			if (response.statusCode == 200) {
				console.log("Found registration page");
				request({
					url: 'https://www.o2startrader.co.uk/register',
					method: 'post',
					headers: {
						'User-Agent': userAgent,
						'x-requested-with': 'XMLHttpRequest'
					},
					formData: {
						'Customer[title]': 'Mr',
						'Customer[firstName]': firstName,
						'Customer[lastName]': lastName,
						'Customer[mobileNo]': mobileNumberParam,
						'Customer[email]': emailParam,
						'Customer[password]': password,
						'Customer[confirm_password]': password,
						'Customer[occupation]': 'Administrator',
						'Customer[first_language]': 'English',
						'Customer[hear_about]': 'Friend or relative',
						'Customer[specific_url]': 0,
						'Customer[company_name]': '',
						'Customer[industry]': 'Business / professional services',
						'Customer[terms]': 1,
						'CustomerAddress[postCode]': '',
						'ajax': 'register-form',
						'register': 'undefined'
					},
				}, function (error, response, body) {
					if (response.statusCode == 200) {
						console.log("Posted registration details");
						request({
							url: 'https://www.o2startrader.co.uk/register',
							method: 'post',
							headers: {
								'User-Agent': userAgent,
								'x-requested-with': 'XMLHttpRequest'
							},
							formData: {
								'Customer[title]': 'Mr',
								'Customer[firstName]': firstName,
								'Customer[lastName]': lastName,
								'Customer[mobileNo]': mobileNumberParam,
								'Customer[email]': emailParam,
								'Customer[password]': password,
								'Customer[confirm_password]': password,
								'Customer[occupation]': 'Administrator',
								'Customer[first_language]': 'English',
								'Customer[hear_about]': 'Friend or relative',
								'Customer[specific_url]': 0,
								'Customer[company_name]': '',
								'Customer[industry]': 'Business / professional services',
								'Customer[terms]': 1,
								'CustomerAddress[postCode]': postcode,
								'ajax': 'register-form',
								'step_validate_postcode': 'undefined'
							},
						}, function (error, response, body) {
							if (response.statusCode == 200) {
								console.log("Posted post code");
								request({
									url: 'https://www.o2startrader.co.uk/register',
									method: 'post',
									headers: {
										'User-Agent': userAgent,
										'x-requested-with': 'XMLHttpRequest'
									},
									formData: {
										'Customer[title]': 'Mr',
										'Customer[firstName]': firstName,
										'Customer[lastName]': lastName,
										'Customer[mobileNo]': mobileNumberParam,
										'Customer[email]': emailParam,
										'Customer[password]': password,
										'Customer[confirm_password]': password,
										'Customer[occupation]': 'Administrator',
										'Customer[first_language]': 'English',
										'Customer[hear_about]': 'Friend or relative',
										'Customer[specific_url]': 0,
										'Customer[company_name]': '',
										'Customer[industry]': 'Business / professional services',
										'Customer[terms]': 1,
										'CustomerAddress[postCode]': postcode,
										'CustomerAddress[line1]': addressline1,
										'ajax': 'register-form',
										'step_save_address': 'undefined'
									},
								}, function (error, response, body) {
									if (response.statusCode == 200) {
										console.log("Posted address info");
										request.get({
												headers: {
													'user-agent': userAgent,
													'x-requested-with': 'XMLHttpRequest'
												},
												url: 'https://www.o2startrader.co.uk/approveUser'
											},
											function (error, response, body) {
												if (response.statusCode == 200) {
													console.log("User account has been verified");
													request.get({
															headers: {
																'user-agent': userAgent,
															},
															url: 'https://www.o2startrader.co.uk/site/login-trader',
															followAllRedirects: true
														},
														function (error, response, body) {
															if (response.statusCode == 200) {
																console.log("User has logged in");
																request.get({
																		headers: {
																			'user-agent': userAgent,
																		},
																		url: 'https://www.o2startrader.co.uk/account/new-order'
																	},
																	function (error, response, body) {
																		if (response.statusCode == 200) {
																			console.log("Found order page");
																			request({
																				url: 'https://www.o2startrader.co.uk/account/updateBasketItems',
																				method: 'post',
																				headers: {
																					'User-Agent': userAgent,
																					'x-requested-with': 'XMLHttpRequest'
																				},
																				formData: {
																					'items': '[{"ProductId":33,"Qty":20},{"ProductId":29,"Qty":0},{"ProductId":40,"Qty":0},{"ProductId":39,"Qty":0},{"ProductId":38,"Qty":0},{"ProductId":37,"Qty":0},{"ProductId":34,"Qty":0}]'
																				},
																			}, function (error, response, body) {
																				if (response.statusCode == 200) {
																					console.log("Added sim's to cart");
																					request.get({
																							headers: {
																								'user-agent': userAgent,
																							},
																							url: 'https://www.o2startrader.co.uk/account/checkout'
																						},
																						function (error, response, body) {
																							if (response.statusCode == 200) {
																								$ = cheerio.load(body);
																								addressID = $('#Order_addressId').attr('value');
																								console.log("Address ID: " + addressID);
																								console.log("Found address information");
																								request({
																									url: 'https://www.o2startrader.co.uk/account/checkout',
																									method: 'post',
																									headers: {
																										'User-Agent': userAgent,
																										'x-requested-with': 'XMLHttpRequest'
																									},
																									formData: {
																										'Order[addressId]': addressID,
																										'ajax': 'checkout-form',
																										'undefined': 'undefined'
																									},
																								}, function (error, response, body) {
																									if (response.statusCode == 200) {
																										console.log("Posted adress information for checkout");
																										request({
																											url: 'https://www.o2startrader.co.uk/account/checkout',
																											method: 'post',
																											headers: {
																												'User-Agent': userAgent,
																												'x-requested-with': 'XMLHttpRequest'
																											},
																											formData: {
																												'Order[addressId]': addressID,
																												'ajax': 'checkout-form',
																												'complete': 'undefined'
																											},
																										}, function (error, response, body) {
																											if (response.statusCode == 200) {
																												console.log("Completed order. 20 Sim's ordered. \nAccount saved to accounts.txt");
																												fs.appendFile('accounts.txt', "Successful account. Sim ordered: " + emailParam + ":" + password + "\r\n", function (err) {
																													if (err) throw err;
																												});
																											} else {
																												console.log("Error");
																												console.log("Status: " + response.statusCode);
																												console.log("Body: " + body);
																												return;
																											}
																										});
																									} else {
																										console.log("Error! Account saved to accounts.txt");
																										console.log("Status: " + response.statusCode);
																										console.log("Body: " + body);
																										fs.appendFile('accounts.txt', "Error Account (Try manually order Sim): " + emailParam + ":" + password + "\r\n", function (err) {
																											if (err) throw err;
																										});
																										return;
																									}
																								});
																							} else {
																								console.log("Error! Account saved to accounts.txt");
																								console.log("Status: " + response.statusCode);
																								console.log("Body: " + body);
																								fs.appendFile('accounts.txt', "Error Account (Try manually order Sim): " + emailParam + ":" + password + "\r\n", function (err) {
																									if (err) throw err;
																								});
																								return;
																							}
																						});
																				} else {
																					console.log("Error! Account saved to accounts.txt");
																					console.log("Status: " + response.statusCode);
																					console.log("Body: " + body);
																					fs.appendFile('accounts.txt', "Error Account (Try manually order Sim): " + emailParam + ":" + password + "\r\n", function (err) {
																						if (err) throw err;
																					});
																					return;
																				}
																			});
																		} else {
																			console.log("Error! Account saved to accounts.txt");
																			console.log("Status: " + response.statusCode);
																			console.log("Body: " + body);
																			fs.appendFile('accounts.txt', "Error Account (Try manually order Sim): " + emailParam + ":" + password + "\r\n", function (err) {
																				if (err) throw err;
																			});
																			return;
																		}
																	});
															} else {
																console.log("Error! Account saved to accounts.txt");
																console.log("Status: " + response.statusCode);
																console.log("Body: " + body);
																fs.appendFile('accounts.txt', "Error Account (Try manually order Sim): " + emailParam + ":" + password + "\r\n", function (err) {
																	if (err) throw err;
																});
																return;
															}
														});
												} else {
													console.log("Error! Account saved to accounts.txt");
													console.log("Status: " + response.statusCode);
													console.log("Body: " + body);
													fs.appendFile('accounts.txt', "Error Account (Try manually order Sim): " + emailParam + ":" + password + "\r\n", function (err) {
														if (err) throw err;
													});
													return;
												}
											});
									} else {
										console.log("Error! Account saved to accounts.txt");
										console.log("Status: " + response.statusCode);
										console.log("Body: " + body);
										fs.appendFile('accounts.txt', "Error Account (Try manually order Sim): " + emailParam + ":" + password + "\r\n", function (err) {
											if (err) throw err;
										});
										return;
									}
								});
							} else {
								console.log("Error! Account saved to accounts.txt");
								console.log("Status: " + response.statusCode);
								console.log("Body: " + body);
								fs.appendFile('accounts.txt', "Error Account (Try manually order Sim): " + emailParam + ":" + password + "\r\n", function (err) {
									if (err) throw err;
								});
								return;
							}
						});
					} else {
						console.log("Error! Account saved to accounts.txt");
						console.log("Status: " + response.statusCode);
						console.log("Body: " + body);
						fs.appendFile('accounts.txt', "Error Account (Try manually order Sim): " + emailParam + ":" + password + "\r\n", function (err) {
							if (err) throw err;
						});
						return;
					}
				});
			} else {
				console.log("Error! Account saved to accounts.txt");
				console.log("Status: " + response.statusCode);
				console.log("Body: " + body);
				fs.appendFile('accounts.txt', "Error Account (Try manually order Sim): " + emailParam + ":" + password + "\r\n", function (err) {
					if (err) throw err;
				});
				return;
			}
		});
}