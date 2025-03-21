package sns.teddyweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sns.teddyweb.component.JwtUtil;
import sns.teddyweb.dto.LoginRequest;
import sns.teddyweb.model.User;
import sns.teddyweb.service.UserService;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            // 사용자가 보낸 로그인 정보 확인
            String username = request.getUsername();
            String password = request.getPassword();

            // 사용자 인증
            User user = userService.authenticateUser(username, password);

            if (user != null) {
                // JWT 토큰 발급
                String token = jwtUtil.generateToken(user.getUsername());

                // 응답 반환
                return ResponseEntity.ok(Collections.singletonMap("token", token));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "로그인 실패"));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "서버 오류 발생!"));
        }
    }

}
