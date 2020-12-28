defmodule LightspeedWebWeb.PageController do
  use LightspeedWebWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
