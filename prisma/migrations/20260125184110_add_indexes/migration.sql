-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_email_role_idx" ON "User"("email", "role");

-- CreateIndex
CREATE INDEX "verifyCode_used_idx" ON "verifyCode"("used");

-- CreateIndex
CREATE INDEX "verifyCode_blockedUntil_idx" ON "verifyCode"("blockedUntil");

-- CreateIndex
CREATE INDEX "verifyCode_email_expiresAt_used_idx" ON "verifyCode"("email", "expiresAt", "used");
