namespace LocalFS
{

    public partial class MyPC
    {
        public partial ISystem_Environment FromStaticEnv();
        public partial ISystem_DateTime FromStaticDate();
        public partial ISystem_Diagnostics_Process FromStaticProcess(Process p);
    }
}