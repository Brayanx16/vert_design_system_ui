import { ref, unref } from "vue";

export function useCalendar(
  url: string,
  authorization: string,
  method: string,
  eventClass: any
) {
  const events = ref<any[] | null>(null);
  const _url = unref(url);
  const _authorization = unref(authorization);
  const _method = unref(method) || "GET";

  async function getEvents() {
    if (!_url || !_authorization) {
      return;
    }
    await fetch(`${_url}`, {
      method: _method,
      credentials: "include",
      headers: { Authorization: _authorization },
    }).then(async (res) => {
      if (res) {
        const _res = await res.json();
        events.value = _res.map(
          (event: any) => new eventClass.Event(event).event_formated
        );
      }
    });
  }

  getEvents();

  return { events };
}
