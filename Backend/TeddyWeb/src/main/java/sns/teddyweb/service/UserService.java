package sns.teddyweb.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sns.teddyweb.model.User;
import sns.teddyweb.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // 로그인 허가
    public User authenticateUser(String username, String password) {
        User user = getUserByUsername(username);

        if (user != null) {
            String storedPassword = user.getPassword();

            //BCrypt 로 암호화된 비밀번호 확인
            boolean isEncrypted = storedPassword.startsWith("$2a$") ||
                    storedPassword.startsWith("$2b$") ||
                    storedPassword.startsWith("$2y$");

            if (isEncrypted) {
                if (passwordEncoder.matches(password, storedPassword)) {
                    return user;
                }
            } else {
                // 평문일 경우
                if (password.equals(storedPassword)) {
                    // 로그인 성공 시 비밀번호를 암호화하여 업데이트
                    user.setPassword(passwordEncoder.encode(password));
                    userRepository.save(user);
                    return user;
                }
            }
        }
        return null;
    }


}
