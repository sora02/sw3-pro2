import { useState, useEffect } from 'react';
import * as S from './Account.style';
import { validatePassword, checkPassword } from '../../utils/validation';

Account.defaultProps = {
  nickname: 'clother',
  userEmail: 'clother@email.com',
};

export default function Account({ nickname, userEmail }) {
  // State
  // 닉네임 변경
  const [nickName, setNickName] = useState('');

  // 새로운 비밀번호
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('');

  // api
  useEffect(() => {}, []);

  // Handle Event
  // TODO input Debouncing 처리하기
  const handlePassword = (e) => {
    const password = e.target.value;
    const message = validatePassword(password);

    // 안내메시지, 비밀번호 저장
    setPasswordMessage(message);
    setPassword(password);
  };

  // 안내메시지, 비밀번호 재확인
  const handlePasswordCheck = (e) => {
    const passwordCheck = e.target.value;
    const message = checkPassword(password, passwordCheck);

    setPasswordCheckMessage(message);
    setRePassword(passwordCheck);
  };

  const deleteAccount = () => {
    const message = window.confirm('정말로 탈퇴하시겠습니까?');

    if (message) {
      window.location = '/';
    }
  };

  return (
    <main>
      <S.AccountWrapper>
        <S.Profile>
          <h2>프로필</h2>
          <hr />
          <S.ProfileWrapper>
            <S.UserFormWrapper>
              <form>
                <S.Label>닉네임</S.Label>
                <S.NickNameWrapper>
                  <S.Input type="text" defaultValue={nickname} />
                  <S.SubmitButton type="submit">변경하기</S.SubmitButton>
                </S.NickNameWrapper>
                <S.Password>
                  <div>
                    <S.Label htmlFor="password">새로운 비밀번호</S.Label>
                    <S.PasswordWrapper>
                      <S.Input
                        type="password"
                        id="password"
                        defaultValue={password}
                        onChange={handlePassword}
                      />
                      <S.Message>{passwordMessage}</S.Message>
                    </S.PasswordWrapper>
                  </div>
                  <div>
                    <S.Label htmlFor="password-check">
                      새로운 비밀번호 확인
                    </S.Label>
                    <S.PasswordWrapper>
                      <S.Input
                        type="password"
                        id="password-check"
                        defaultValue={rePassword}
                        onChange={handlePasswordCheck}
                      />
                      <S.Message>{passwordCheckMessage}</S.Message>
                    </S.PasswordWrapper>
                  </div>
                  <S.SubmitButton type="submit">변경하기</S.SubmitButton>
                </S.Password>
              </form>
              <div>
                <S.Label>이메일</S.Label>
                <S.Input type="text" value={userEmail} disabled />
              </div>
            </S.UserFormWrapper>
          </S.ProfileWrapper>
        </S.Profile>
        <S.DeleteAccount>
          <h2>회원탈퇴</h2>
          <hr />
          <S.DeleteDescription>
            회원탈퇴 시 작성한 게시물은 삭제되지 않습니다. <br />
            작성한 게시물은 직접 삭제해주세요.
          </S.DeleteDescription>
          <S.DeleteButton>
            <S.SubmitButton onClick={deleteAccount}>회원탈퇴</S.SubmitButton>
          </S.DeleteButton>
        </S.DeleteAccount>
      </S.AccountWrapper>
    </main>
  );
}
