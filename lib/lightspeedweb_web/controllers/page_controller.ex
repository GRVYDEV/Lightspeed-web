defmodule LightspeedwebWeb.PageController do
  use LightspeedwebWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
