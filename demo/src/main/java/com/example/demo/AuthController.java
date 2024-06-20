package com.example.demo;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody TokenRequest tokenRequest) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(tokenRequest.getToken());
            String uid = decodedToken.getUid();
            return ResponseEntity.ok("Login successful: " + uid);
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }
}

class TokenRequest {
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
