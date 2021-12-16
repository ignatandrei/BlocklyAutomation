namespace LocalAPIChrome;

public class ChromeBookmark
{ 
    private static long tickFirst= new DateTime(1601, 1, 1).Ticks;
    public string? date_added { get; set; }
    public string? guid { get; set; }
    public string? id { get; set; }
    public string? name { get; set; }
    public string? type { get; set; }
    public string? url { get; set; }
    public DateTime? DateAdded
    {
        get
        {
            if (date_added == null)
                return null;
            var date = long.Parse(date_added);
            return new DateTime(tickFirst+ 10L* date, DateTimeKind.Utc);
        }
        set
        {
            //do nothing for the moment
        }
    }
}
