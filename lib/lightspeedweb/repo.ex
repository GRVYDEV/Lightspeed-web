defmodule LightspeedWeb.Repo do
  use Ecto.Repo,
    otp_app: :lightspeedweb,
    adapter: Ecto.Adapters.Postgres
end
