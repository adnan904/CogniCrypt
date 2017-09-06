scope({c0_Algorithm:2, c0_AttributeBasedCipher:2, c0_Cipher:2, c0_description:2, c0_name:2});
defaultScope(1);
intRange(-8, 7);
stringLength(28);

c0_Algorithm = Abstract("c0_Algorithm");
c0_name = c0_Algorithm.addChild("c0_name").withCard(1, 1);
c0_description = c0_Algorithm.addChild("c0_description").withCard(1, 1);
c0_Cipher = Abstract("c0_Cipher");
c0_AttributeBasedCipher = Abstract("c0_AttributeBasedCipher");
c0_ABECipherTextPolicy = Clafer("c0_ABECipherTextPolicy").withCard(1, 1);
c0_ABEKeyIndexPolicy = Clafer("c0_ABEKeyIndexPolicy").withCard(1, 1);
c0_Task = Abstract("c0_Task");
c1_description = c0_Task.addChild("c1_description").withCard(1, 1);
c0_ABE = Clafer("c0_ABE").withCard(1, 1);
c0_abe = c0_ABE.addChild("c0_abe").withCard(1, 1);
c0_name.refTo(string);
c0_description.refTo(string);
c0_Cipher.extending(c0_Algorithm);
c0_AttributeBasedCipher.extending(c0_Cipher);
c0_ABECipherTextPolicy.extending(c0_AttributeBasedCipher);
c0_ABECipherTextPolicy.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"Cipher Text Policy\"")));
c0_ABECipherTextPolicy.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"Cipher Text Policy\"")));
c0_ABEKeyIndexPolicy.extending(c0_AttributeBasedCipher);
c0_ABEKeyIndexPolicy.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"Key Index Policy\"")));
c0_ABEKeyIndexPolicy.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"Key Index Policy\"")));
c1_description.refTo(string);
c0_ABE.extending(c0_Task);
c0_ABE.addConstraint(equal(joinRef(join($this(), c1_description)), constant("\"Attribute-Based Encryption\"")));
c0_abe.refTo(c0_AttributeBasedCipher);
c0_ABE.addConstraint(or(equal(joinRef(join($this(), c0_abe)), global(c0_ABECipherTextPolicy)), equal(joinRef(join($this(), c0_abe)), global(c0_ABEKeyIndexPolicy))));
