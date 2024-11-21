import Welcome from '@app/(root)/welcome/page'
import Chat from '@app/pages/chat/Chat'
import ChatHistory from '@app/pages/chat/ChatHistory/page'
export default function HomePage() {
  return (
    <div className="">
     {/* <Welcome/> */}
     <Chat/>
     <ChatHistory/>
    </div>
  );
}
