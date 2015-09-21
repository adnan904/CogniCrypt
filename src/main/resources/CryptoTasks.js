scope({c0_Algorithm:9, c0_Cipher:3, c0_Digest:3, c0_Fast:9, c0_High:3, c0_KeyDerivationAlgorithm:3, c0_Low:3, c0_Medium:3, c0_Security:4, c0_Slow:9, c0_SymmetricBlockCipher:3, c0_SymmetricCipher:3, c0_VeryFast:9, c0_VerySlow:9, c0_description:9, c0_digest:3, c0_iterations:3, c0_keySize:3, c0_memory:3, c0_name:9, c0_outputSize:3, c0_performance:9, c0_security:9, c1_outputSize:3});
defaultScope(1);
intRange(-8, 7);
stringLength(38);

c0_Security = Abstract("c0_Security");
c0_Algorithm = Abstract("c0_Algorithm");
c0_Task = Abstract("c0_Task");
c0_Digest = Abstract("c0_Digest").extending(c0_Algorithm);
c0_KeyDerivationAlgorithm = Abstract("c0_KeyDerivationAlgorithm").extending(c0_Algorithm);
c0_Cipher = Abstract("c0_Cipher").extending(c0_Algorithm);
c0_SymmetricCipher = Abstract("c0_SymmetricCipher").extending(c0_Cipher);
c0_SymmetricBlockCipher = Abstract("c0_SymmetricBlockCipher").extending(c0_SymmetricCipher);
c0_Broken = Clafer("c0_Broken").withCard(1, 1).extending(c0_Security);
c0_Weak = Clafer("c0_Weak").withCard(1, 1).extending(c0_Security);
c0_Modern = Clafer("c0_Modern").withCard(1, 1).extending(c0_Security);
c0_Strong = Clafer("c0_Strong").withCard(1, 1).extending(c0_Security);
c0_name = c0_Algorithm.addChild("c0_name").withCard(1, 1);
c0_description = c0_Algorithm.addChild("c0_description").withCard(1, 1);
c0_security = c0_Algorithm.addChild("c0_security").withCard(1, 1);
c0_performance = c0_Algorithm.addChild("c0_performance").withCard(1, 1).withGroupCard(1, 1);
c0_VerySlow = c0_performance.addChild("c0_VerySlow").withCard(0, 1);
c0_Slow = c0_performance.addChild("c0_Slow").withCard(0, 1);
c0_Fast = c0_performance.addChild("c0_Fast").withCard(0, 1);
c0_VeryFast = c0_performance.addChild("c0_VeryFast").withCard(0, 1);
c0_outputSize = c0_Digest.addChild("c0_outputSize").withCard(1, 1);
c0_iterations = c0_KeyDerivationAlgorithm.addChild("c0_iterations").withCard(1, 1);
c1_outputSize = c0_KeyDerivationAlgorithm.addChild("c1_outputSize").withCard(1, 1);
c0_digest = c0_KeyDerivationAlgorithm.addChild("c0_digest").withCard(0, 1);
c1_description = c0_Task.addChild("c1_description").withCard(1, 1);
c0_memory = c0_Cipher.addChild("c0_memory").withCard(1, 1).withGroupCard(1, 1);
c0_Low = c0_memory.addChild("c0_Low").withCard(0, 1);
c0_Medium = c0_memory.addChild("c0_Medium").withCard(0, 1);
c0_High = c0_memory.addChild("c0_High").withCard(0, 1);
c0_keySize = c0_SymmetricCipher.addChild("c0_keySize").withCard(1, 1);
c0_Ciphers = Clafer("c0_Ciphers").withCard(1, 1);
c0_AES128 = c0_Ciphers.addChild("c0_AES128").withCard(1, 1).extending(c0_SymmetricBlockCipher);
c0_AES256 = c0_Ciphers.addChild("c0_AES256").withCard(1, 1).extending(c0_SymmetricBlockCipher);
c0_DES = c0_Ciphers.addChild("c0_DES").withCard(1, 1).extending(c0_SymmetricBlockCipher);
c0_DigestAlgorithms = Clafer("c0_DigestAlgorithms").withCard(1, 1);
c0_md5 = c0_DigestAlgorithms.addChild("c0_md5").withCard(1, 1).extending(c0_Digest);
c0_sha_1 = c0_DigestAlgorithms.addChild("c0_sha_1").withCard(1, 1).extending(c0_Digest);
c0_sha_256 = c0_DigestAlgorithms.addChild("c0_sha_256").withCard(1, 1).extending(c0_Digest);
c0_KeyDerivationAlgorithms = Clafer("c0_KeyDerivationAlgorithms").withCard(1, 1);
c0_pbkdf = c0_KeyDerivationAlgorithms.addChild("c0_pbkdf").withCard(1, 1).extending(c0_KeyDerivationAlgorithm);
c0_scrypt = c0_KeyDerivationAlgorithms.addChild("c0_scrypt").withCard(1, 1).extending(c0_KeyDerivationAlgorithm);
c0_bcrypt = c0_KeyDerivationAlgorithms.addChild("c0_bcrypt").withCard(1, 1).extending(c0_KeyDerivationAlgorithm);
c0_SymmetricEncryption = Clafer("c0_SymmetricEncryption").withCard(1, 1).extending(c0_Task);
c0_cipher = c0_SymmetricEncryption.addChild("c0_cipher").withCard(1, 1);
c0_name.refTo(string);
c0_description.refTo(string);
c0_security.refTo(c0_Security);
c0_outputSize.refTo(Int);
c0_iterations.refTo(Int);
c1_outputSize.refTo(Int);
c0_digest.refTo(c0_Digest);
c1_description.refTo(string);
c0_keySize.refTo(Int);
c0_cipher.refTo(c0_SymmetricBlockCipher);
c0_KeyDerivationAlgorithm.addConstraint(implies(some(join($this(), c0_digest)), equal(joinRef(join($this(), c1_outputSize)), joinRef(join(joinRef(join($this(), c0_digest)), c0_outputSize)))));
c0_KeyDerivationAlgorithm.addConstraint(implies(some(join($this(), c0_digest)), equal(joinRef(join($this(), c0_security)), joinRef(join(joinRef(join($this(), c0_digest)), c0_security)))));
c0_KeyDerivationAlgorithm.addConstraint(implies(none(join($this(), c0_digest)), or(or(equal(joinRef(join($this(), c1_outputSize)), constant(128)), equal(joinRef(join($this(), c1_outputSize)), constant(192))), equal(joinRef(join($this(), c1_outputSize)), constant(256)))));
c0_KeyDerivationAlgorithm.addConstraint(implies(and(none(join($this(), c0_digest)), equal(joinRef(join($this(), c1_outputSize)), constant(128))), equal(joinRef(join($this(), c0_security)), global(c0_Modern))));
c0_KeyDerivationAlgorithm.addConstraint(implies(and(none(join($this(), c0_digest)), greaterThan(joinRef(join($this(), c1_outputSize)), constant(128))), equal(joinRef(join($this(), c0_security)), global(c0_Strong))));
c0_KeyDerivationAlgorithm.addConstraint(equal(joinRef(join($this(), c0_iterations)), constant(1000)));
c0_AES128.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"AES encryption with 128bit key\"")));
c0_AES128.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"AES-128bit\"")));
c0_AES128.addConstraint(some(join(join($this(), c0_performance), c0_Fast)));
c0_AES128.addConstraint(equal(joinRef(join($this(), c0_security)), global(c0_Modern)));
c0_AES128.addConstraint(some(join(join($this(), c0_memory), c0_Low)));
c0_AES128.addConstraint(equal(joinRef(join($this(), c0_keySize)), constant(128)));
c0_AES256.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"AES encryption with 256bit key\"")));
c0_AES256.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"AES-256bit\"")));
c0_AES256.addConstraint(some(join(join($this(), c0_performance), c0_Fast)));
c0_AES256.addConstraint(equal(joinRef(join($this(), c0_security)), global(c0_Strong)));
c0_AES256.addConstraint(some(join(join($this(), c0_memory), c0_Medium)));
c0_AES256.addConstraint(equal(joinRef(join($this(), c0_keySize)), constant(256)));
c0_DES.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"DES encryption\"")));
c0_DES.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"DES\"")));
c0_DES.addConstraint(some(join(join($this(), c0_performance), c0_Slow)));
c0_DES.addConstraint(some(join(join($this(), c0_memory), c0_Low)));
c0_DES.addConstraint(equal(joinRef(join($this(), c0_security)), global(c0_Weak)));
c0_DES.addConstraint(equal(joinRef(join($this(), c0_keySize)), constant(56)));
c0_md5.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"MD5 digest\"")));
c0_md5.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"MD5 digest\"")));
c0_md5.addConstraint(some(join(join($this(), c0_performance), c0_VeryFast)));
c0_md5.addConstraint(equal(joinRef(join($this(), c0_security)), global(c0_Broken)));
c0_md5.addConstraint(equal(joinRef(join($this(), c0_outputSize)), constant(128)));
c0_sha_1.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"SHA-1\"")));
c0_sha_1.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"SHA-1 digest\"")));
c0_sha_1.addConstraint(some(join(join($this(), c0_performance), c0_VeryFast)));
c0_sha_1.addConstraint(equal(joinRef(join($this(), c0_security)), global(c0_Modern)));
c0_sha_1.addConstraint(equal(joinRef(join($this(), c0_outputSize)), constant(160)));
c0_sha_256.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"SHA-256\"")));
c0_sha_256.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"SHA-256 digest\"")));
c0_sha_256.addConstraint(equal(joinRef(join($this(), c0_outputSize)), constant(256)));
c0_sha_256.addConstraint(equal(joinRef(join($this(), c0_security)), global(c0_Strong)));
c0_sha_256.addConstraint(some(join(join($this(), c0_performance), c0_Slow)));
c0_pbkdf.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"PBKDF2\"")));
c0_pbkdf.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"PBKDF2 key derivation\"")));
c0_pbkdf.addConstraint(some(join(join($this(), c0_performance), c0_Slow)));
c0_pbkdf.addConstraint(some(join($this(), c0_digest)));
c0_scrypt.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"scrypt\"")));
c0_scrypt.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"Scrypt password-based key derivation\"")));
c0_scrypt.addConstraint(none(join($this(), c0_digest)));
c0_scrypt.addConstraint(some(join(join($this(), c0_performance), c0_VerySlow)));
c0_bcrypt.addConstraint(equal(joinRef(join($this(), c0_name)), constant("\"bcrypt\"")));
c0_bcrypt.addConstraint(equal(joinRef(join($this(), c0_description)), constant("\"Bcrypt password-based key derivation\"")));
c0_bcrypt.addConstraint(none(join($this(), c0_digest)));
c0_bcrypt.addConstraint(some(join(join($this(), c0_performance), c0_Slow)));
c0_bcrypt.addConstraint(equal(joinRef(join($this(), c1_outputSize)), constant(192)));
c0_SymmetricEncryption.addConstraint(equal(joinRef(join($this(), c1_description)), constant("\"Encrypt data using a secret key\"")));
