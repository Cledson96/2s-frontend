
import { useEffect, useState } from 'react';

export function Table({ motoboys }) {
    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/jquery/jquery.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/bootstrap/js/bootstrap.bundle.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/datatables/jquery.dataTables.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/datatables-bs4/js/dataTables.bootstrap4.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/datatables-responsive/js/dataTables.responsive.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/datatables-responsive/js/responsive.bootstrap4.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/datatables-buttons/js/dataTables.buttons.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/datatables-buttons/js/buttons.bootstrap4.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/jszip/jszip.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/pdfmake/pdfmake.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/pdfmake/vfs_fonts.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/datatables-buttons/js/buttons.html5.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/datatables-buttons/js/buttons.print.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);


    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./plugins/datatables-buttons/js/buttons.colVis.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);


    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./dist/js/adminlte.min.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = `./dist/js/demo.js`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {

        const script = document.createElement("script");
        script.innerHTML = `  $(function () {
            $("#example1").DataTable({
              "responsive": true, "lengthChange": false, "autoWidth": false,
              "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
                  });`;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div class="content-wrapper">

            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Lista de motoboys</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">motoboys</a></li>
                                <li class="breadcrumb-item active">lista motoboys</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">


                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Motoboys</h3>
                                </div>

                                <div class="card-body" data-card-widget="card-refresh">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Telefone</th>
                                                <th>Telefone de contato</th>
                                                <th>Utilitario</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {motoboys.map((refe, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{refe.name}</td>
                                                        <td>{refe.phone} </td>
                                                        <td>{refe.phonecontact}</td>
                                                        <td>{refe.utility}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Telefone</th>
                                                <th>Telefone contato</th>
                                                <th>Utilitario</th>

                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>



    )
}