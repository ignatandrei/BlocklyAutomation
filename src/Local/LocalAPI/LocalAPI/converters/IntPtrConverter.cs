

using System.Text.Json;

namespace LocalAPI.converters;
public class IntPtrConverter : JsonConverter<IntPtr>
{
    public override IntPtr Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return IntPtr.Zero;
    }

    public override void Write(Utf8JsonWriter writer, IntPtr value, JsonSerializerOptions options)
    {
        return;
    }
}

