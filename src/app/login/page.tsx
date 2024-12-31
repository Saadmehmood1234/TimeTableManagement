const LoginPage = ()=>{
return <div className="w-full flex-1 justify-center">
<form action="" className="flex flex-col gap-2  items-center">
    <h1 className="text-2xl font-semibold drop-shadow-md">Admin Login</h1>
    <div className="flex flex-col gap-1">
        <p className="font-semibold text-[#4d4d4d]">Enter the Email</p>
        <input type="email"  placeholder="eg. kamlesh@gmail.com" className="w-[400px] h-[35px] rounded outline-none pl-4"/>
    </div>

    <div className="flex flex-col gap-1">
        <p className="font-semibold text-[#4d4d4d]">Entet the Password</p>
        <input type="password" className="w-[400px] h-[35px] rounded outline-none pl-4" placeholder="eg. ****@**" />
    </div>
   <button className="w-[400px] h-[35px] rounded outline-none pl-4 bg-[#4B3F72] mt-6 text-white font-semibold hover:bg-[#615196]">Login</button>
</form>
</div>
}

export default LoginPage;