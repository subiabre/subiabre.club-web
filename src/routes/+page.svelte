<script lang="ts">
    import Tray from "../lib/layout/Tray.svelte";
    import TraySlide from "../lib/layout/TraySlide.svelte";
    import TraySlideNav from "../lib/layout/TraySlideNav.svelte";
</script>

<Tray>
    <TraySlideNav>
        <ul slot="photos" class="menu">
            <li>
                <a class="color-body" href="/photos#filters"><h3>Filtros</h3></a
                >
            </li>
            <li>
                <a class="color-body" href="/photos#collection"
                    ><h3>Colección</h3></a
                >
            </li>
        </ul>
        <ul slot="user" class="menu">
            <li>
                <a class="color-body" href="#config"><h3>Configuración</h3></a>
            </li>
            <li>
                <a class="color-body" href="#sessions"><h3>Sesiones</h3></a>
            </li>
            <li>
                <a class="color-body" href="#keys"><h3>Llaves</h3></a>
            </li>
        </ul>
    </TraySlideNav>
    <TraySlide id="config">
        <div class="padded">
            <h1>Configuración.</h1>
            <p>
                Aquí puedes actualizar la información asociada a tu cuenta así
                como tus configuraciones de efectos.
            </p>
            <p>
                Las configuraciones de efectos no se sincronizan para todos tus
                dispositivos, en cambio solo se guardarán en el navegador
                actual.
            </p>
        </div>

        <section class="padded">
            <h2>Efectos</h2>
            <form>
                <p>
                    <label for="check-soundfxs">
                        <h6>Efectos de sonido</h6>
                        <input id="check-soundfxs" type="checkbox" />
                        <label for="check-soundfxs">Desactivados</label>
                    </label>
                </p>

                <p>
                    <label for="check-fxs">
                        <h6>Efectos visuales</h6>
                        <input id="check-fxs" type="checkbox" />
                        <label for="check-fxs">Desactivados</label>
                    </label>
                </p>

                <p>Las elecciones de efectos se guardan automáticamente.</p>
            </form>
        </section>

        <section class="padded">
            <h2>Nombre</h2>
            <form>
                <p>
                    <label for="input-username">
                        <h6>Nombre</h6>
                        <input
                            id="input-username"
                            type="text"
                            placeholder="Nuevo nombre de usuario"
                        />
                    </label>
                </p>

                <p>
                    <button class="color-success"
                        >Actualizar nombre de usuario</button
                    >
                </p>
            </form>
        </section>

        <section class="padded">
            <h2>Contraseña</h2>
            <form>
                <p>
                    <label for="input-password-current">
                        <h6>Contraseña actual</h6>
                        <input
                            id="input-password-current"
                            type="password"
                            placeholder="******"
                        />
                    </label>
                </p>

                <p>
                    <label for="input-password-new">
                        <h6>Contraseña nueva</h6>
                        <input
                            id="input-password-new"
                            type="password"
                            placeholder="*****"
                        />
                    </label>
                </p>

                <p>Esta acción destruirá todas tus sesiones actuales.</p>
                <p>
                    <button class="color-success">Actualizar contraseña</button>
                </p>
            </form>
        </section>
    </TraySlide>
    <TraySlide id="sessions">
        <div class="padded">
            <h1>Sesiones.</h1>
            <p>
                Las sesiones se crean cuando se usa tu usuario y contraseña, o
                una llave asociada a tu cuenta.
            </p>
            <p>
                Las sesiones vigentes evitan que tengas que autentificar tu
                identidad en cada conexión, pero sólo tienen validez hasta dos
                semanas después de la última conexión.
            </p>
        </div>
        <section class="padded grid">
            <form>
                <h2>Sesión #1 <span class="color-success">(ACTUAL)</span></h2>
                <p>Firefox 110.0.0 en Ubuntu</p>
                <p>Creada hace 8 horas</p>
                <p>Caduca dentro de 2 semanas</p>
                <p>
                    <button class="color-danger">Destruir</button>
                </p>
            </form>
            <form>
                <h2>Sesión #2</h2>
                <p>Firefox 110.0.0 en Ubuntu</p>
                <p>Creada hace 16 días</p>
                <p>Caduca dentro de 9 días</p>
                <p>
                    <button class="color-danger">Destruir</button>
                </p>
            </form>
            <form>
                <h2>Sesión #3</h2>
                <p>Hacker 0 en Rusia</p>
                <p>Creada hace 1 segundo</p>
                <p>Caduca dentro 64 años</p>
                <p>
                    <button class="color-danger">Destruir</button>
                </p>
            </form>
            <form>
                <h2>Sesión #4</h2>
                <p>Chrome 110.0.0 en Linux</p>
                <p>Creada hace 9 horas</p>
                <p>Caduca dentro de 2 semanas</p>
                <p>
                    <button class="color-danger">Destruir</button>
                </p>
            </form>
        </section>
    </TraySlide>
    <TraySlide id="keys">
        <div class="padded">
            <h1>Llaves.</h1>
            <p>
                Las llaves son enlaces URL que garantizan acceso a tu cuenta al
                ser visitados
            </p>
            <p>
                Las llaves pueden usarse indiscriminadamente durante su periodo
                de vigencia. Para evitar problemas de seguridad, <strong
                    >evita que otras personas vean tus llaves</strong
                >.
            </p>
        </div>
        <section class="padded">
            <h2>Crear llave</h2>
            <form>
                <p>
                    <label for="select-date-expires">
                        <h6>Vigencia</h6>
                        <select>
                            <option>1 día</option>
                            <option>2 días</option>
                            <option>3 días</option>
                        </select>
                    </label>
                </p>

                <p>
                    <button class="color-success">Crear llave</button>
                </p>
            </form>
        </section>
        <section class="padded grid">
            <form>
                <h2>Llave #1</h2>
                <p>abcd...1234</p>
                <p>Creada hace 8 horas</p>
                <p>Caduca dentro de 2 semanas</p>
                <p>
                    <figure>
                        <img
                            style="background-color: white;"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/240px-QR_code_for_mobile_English_Wikipedia.svg.png"
                        />
                    </figure>
                </p>
                <p>
                    <span class="button">Copiar</span>
                    <button class="color-danger">Destruir</button>
                </p>
            </form>
        </section>
    </TraySlide>
</Tray>
